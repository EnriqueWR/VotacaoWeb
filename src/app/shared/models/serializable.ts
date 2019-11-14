import * as _ from 'lodash';

interface OmmitedProperty {
    key: string;
    exceptions: string[];
}

export class Serializable {
    @DontSerialize()
    private isSerialized: boolean;

    @DontSerialize()
    protected _omitted_properties: OmmitedProperty[];

    @DontSerialize()
    public key: string;

    constructor(args: any[]) {
        this.isSerialized = false;
        this.key = null;
        this.inicializaDados();
        this.carregaDados(args);
    }

    carregaDados(args: any[]): void {
        for (const item of args) {
            if (item && typeof item === 'object') {
                Object.assign(this, item);
            }
        }
    }

    inicializaDados(): void {}

    protected addOmmitedProperty(ommited_property: OmmitedProperty): void {
        if (!this._omitted_properties) {
            this._omitted_properties = [];
        }

        this._omitted_properties.push(ommited_property);
    }

    public serialize(exceptions: string | string[] = ''): {} {
        if (this.isSerialized) {
            return this.ciclicError();
        }

        this.isSerialized = true;
        const serializedObj = _.omit(
            _.mapValues(this, el => {
                if (el === undefined || el === null) {
                    return null;
                }
                if (el['serialize']) {
                    return el['serialize'](exceptions);
                }
                if (el instanceof Array) {
                    return el.map(value => (value && value['serialize'] ? value['serialize'](exceptions) : value));
                }
                return el;
            }),
            this.getOmittedKeys(exceptions)
        );
        this.isSerialized = false;
        return serializedObj;
    }

    ciclicError(): { error: string } {
        return { error: 'ALREADY_SERIALIZED - CICLIC DEPENDENCY!' };
    }

    isExceptionSelected(possibleExceptions: string[], selectedExceptions: string | string[]): boolean {
        return !(_.intersection(possibleExceptions, selectedExceptions).length > 0);
    }

    getOmittedKeys(selectedExceptions: string | string[] = []): string[] {
        return this._omitted_properties
            .filter(el => this.isExceptionSelected(el.exceptions, selectedExceptions))
            .map(el => el.key);
    }
}

export type PropertyDecoratorType = (target: any, propertyKey: string | symbol) => void;

export function DontSerialize(exceptions: string | string[] = []): PropertyDecoratorType {
    return (target: any, propertyKey: string | symbol): void => {
        if (!target.addOmmitedProperty) {
            return;
        }

        target.addOmmitedProperty({
            key: propertyKey,
            exceptions: exceptions instanceof Array ? exceptions : [exceptions]
        });
    };
}

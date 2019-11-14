import { Serializable, DontSerialize, PropertyDecoratorType } from './serializable';

export class FirebaseObject extends Serializable {
    @DontSerialize()
    _firebase_path: string;

    constructor(args: any[] | any) {
        super(args['length'] ? args : [args]);
    }

    public getFirebasePath(): string {
        return this._firebase_path;
    }
}

export function SetFirebasePath(path: string) {
    return <T extends { new (...args: any[]): {} }>(target: T) => {
        return class extends target {
            static _firebase_path = path;

            constructor(...args: any[]) {
                if (args) {
                    args.push({ _firebase_path: path });
                }

                super(args ? args : { _firebase_path: path });
            }
        };
    };
}

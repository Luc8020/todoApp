import { UUIDTypes } from "uuid";

interface TodoInterface {
    title: string;
    description: string;
    ownerId: UUIDTypes;
    filepaths: string[];
}

export { TodoInterface };

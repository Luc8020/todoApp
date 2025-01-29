import { UUIDTypes } from "uuid";

interface TodoInterface {
    title: string;
    description: string;
    ownerId: UUIDTypes;
}

export { TodoInterface };

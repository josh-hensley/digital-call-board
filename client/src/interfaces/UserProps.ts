type group = 'cast' | 'crew' | 'production'

export default interface UserProps {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    age?: number;
    roles?: string[];
    groups?: group[];
}

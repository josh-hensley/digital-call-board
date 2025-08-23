type group = 'cast' | 'crew' | 'production';

export default interface ContactProps {
    id?: string;
    fullName: string;
    email: string;
    phone: string;
    roles: string[];
    age?: number;
    groups?: group[];
}
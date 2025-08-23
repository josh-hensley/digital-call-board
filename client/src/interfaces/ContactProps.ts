export default interface ContactProps {
    id?: string;
    fullName: string;
    email: string;
    phone: string;
    roles: string[];
    age?: number;
    group?: 'cast' | 'crew' | 'production';
}
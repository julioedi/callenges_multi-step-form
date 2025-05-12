export type steps = 1 | 2 | 3 | 4;

export type plan_type = "arcade" | "advanced" | "pro" | "";
export type plan_time = "year" | "";

export interface formFields {
    name: string,
    email: string,
    phone: string,
    plan_type: plan_type,
    plan_time: plan_time,
    online_service: boolean,
    large_storage: boolean,
    custom_profile: boolean,
}
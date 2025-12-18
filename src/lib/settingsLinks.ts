export type TSettingLink = {
    id: number;
    label: string;
    route: string;
}

export const settingsLinks: TSettingLink[] = [
    {id: 1, label: "profile information", route: "/settings"},
    {id: 2, label: "change password", route: "/settings/change-password"},
    {id: 3, label: "Terms and Service", route: "/settings/terms-and-service"},
    {id: 4, label: "Privacy and Policy", route: "/settings/privacy-and-policy"},
    {id: 5, label: "About Us", route: "/settings/about"},
]
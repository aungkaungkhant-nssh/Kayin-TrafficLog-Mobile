import { ExistenceStatus } from "@/utils/enum/ExistenceStatus";
import { z } from "zod";

export const addPunishmentInfoSchema = z.object({
    name: z.string().nonempty({ message: "ယာဉ်မောင်းအမည်လိုအပ်သည်" }),
    father_name: z.string().nonempty({ message: "အဘအမည်လိုအပ်သည်" }),
    nrcExistence: z.nativeEnum(ExistenceStatus),
    nrcState: z.string(),
    nrcTownShip: z.string(),
    nrcType: z.string(),
    nrcNumber: z.string().optional(),
    driver_license_number: z.string().nullable().optional(),
    address: z.string().nonempty({ message: "နေရပ်လိပ်စာလိုအပ်သည်" }),

    vehicle_number: z.string().nonempty({ message: "ယာဉ်နံပါတ်လိုအပ်သည်" }),
    vehicle_categories_id: z.string(),
    vehicle_categories_label: z.string(),
    vehicle_types: z.string().nonempty({ message: "ယာဉ်မော်ဒယ်လိုအပ်သည်" }),
    wheel_tax: z.string().nullable().optional(),
    vehicle_license_number: z.string().nullable().optional(),

    seized_date: z.string().nonempty({ message: "ဖမ်းဆည်းသည့်နေ့လိုအပ်သည်" }),
    seizure_location: z.string().nonempty({ message: "ဖမ်းဆည်းသည့်နေရာလိုအပ်သည်" }),

    article_id: z.string().nonempty({ message: "ပုဒ်မလိုအပ်သည်" }),
    article_label: z.string(),
    committed_id: z.string().nonempty({ message: "ကျူးလွန်ပြစ်မှုလိုအပ်သည်" }),
    committed_label: z.string(),
    fine_amount: z.string(),

    seizedItem_id: z.string(),
    seizedItem_label: z.string()
}).superRefine((data, ctx) => {
    if (data.nrcExistence === ExistenceStatus.Yes) {
        if (!data.nrcNumber || data.nrcNumber.trim() === "") {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["nrcNumber"],
                message: "မှတ်ပုံတင်အမှတ်လိုအပ်သည်",
            });
        } else if (data.nrcNumber.length !== 6) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["nrcNumber"],
                message: "ဂဏန်း ၆ လုံးရှိရမည်။",
            });
        }
    }
});

export type AddPunishmentInfoSchemaType = z.infer<typeof addPunishmentInfoSchema>;
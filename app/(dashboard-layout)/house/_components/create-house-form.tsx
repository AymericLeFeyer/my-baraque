"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createHouseSchema } from "../create-house";
import { createHouse } from "../_actions/create-house";
import type { z } from "zod";


export function CreateHouseForm() {
    const form = useForm<z.infer<typeof createHouseSchema>>({
        resolver: zodResolver(createHouseSchema),
    });

    function onSubmit(data: z.infer<typeof createHouseSchema>) {
        createHouse(data.name);
    }

    return (
        <Form form = {form} onSubmit={onSubmit}>
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input placeholder="house name" {...field} />
                        </FormControl>
                        <FormDescription>Enter the name of the house</FormDescription>
                        <FormMessage />
                    </FormItem>
                )}>

            </FormField>
            <Button type="submit">Create House</Button>
        </Form>


    )

}
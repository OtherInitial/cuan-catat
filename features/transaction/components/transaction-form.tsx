"use client";

import { z } from "zod";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useForm, useWatch } from "react-hook-form";
import { TransactionType } from "@prisma/client"; 
import CreatableSelect from 'react-select/creatable';
import { CalendarIcon, Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import CurrencyInput from 'react-currency-input-field';

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { 
    Popover, 
    PopoverContent, 
    PopoverTrigger 
} from "@/components/ui/popover";
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea"; 

const formSchema = z.object({
    date: z.date(),
    itemName: z.string().min(1, { message: "Nama item harus diisi" }), 
    amount: z.string().min(1, { message: "Jumlah harus diisi" }), 
    type: z.nativeEnum(TransactionType), 
    productId: z.string().uuid().optional().nullable(),
    paymentMethodId: z.string().min(1, { message: "Metode pembayaran harus diisi" }),
    categoryId: z.string().optional().nullable(), 
    note: z.string().optional().nullable(), 
});

export type FormValues = z.input<typeof formSchema>;

type Option = {
    label: string;
    value: string;
}

type Props = {
    onSubmit: (values: FormValues) => void;
    disabled: boolean;
    // categoryOptions: Option[];
    productOptions: Option[];
    paymentMethodOptions: Option[];
    initialValues? : FormValues; 
    isEdit? : boolean;
}

export const TransactionForm = ({
    onSubmit,
    disabled,
    // categoryOptions,
    productOptions,
    paymentMethodOptions,
    initialValues,
    isEdit
}: Props) => {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues || {
            date: new Date(),
            itemName: "",
            amount: "",
            type: TransactionType.PENGELUARAN, 
            paymentMethodId: undefined,
            categoryId: null,
            productId: null,
            note: null,
        },
    });

    const watchedType = useWatch({ 
        control: form.control, 
        name: 'type' 
    });

    const handleSubmit = (values: FormValues) => {
        if (values.type !== TransactionType.PEMASUKAN) {
            values.productId = null;
        }
        onSubmit(values);
    }

    // console.log(watchedType);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 px-4">
                <FormField
                    name="date"
                    control={form.control}
                    render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tanggal</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pilih tanggal</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        initialFocus
                                    />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                                </FormItem>
                        )}
                />

                <FormField
                    name="type"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tipe Transaksi</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                disabled={disabled}
                                required
                            >
                                <FormControl className="w-full">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih tipe transaksi" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value={TransactionType.PENGELUARAN}>
                                        Pengeluaran
                                    </SelectItem>
                                    <SelectItem value={TransactionType.PEMASUKAN}>
                                        Pemasukan
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                
                <FormField
                    name="itemName"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nama Item</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    disabled={disabled}
                                    placeholder="Ketik nama item"
                                    className="text-sm"
                                    required
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {watchedType === TransactionType.PEMASUKAN && (
                    <FormField
                        name="productId"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Produk Terjual (Opsional)</FormLabel>
                                <Select
                                    onValueChange={(value) => field.onChange(value || null)} 
                                    value={field.value ?? ""} 
                                    disabled={disabled}
                                >
                                    <FormControl className="w-full">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih produk yang terjual..." />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="">-- Bukan Penjualan Produk --</SelectItem> 
                                        {productOptions.map(option => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    Pilih jika ini adalah penjualan dari daftar produk Anda.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
                
                {/* <FormField
                    name="categoryId"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Kategori</FormLabel>
                            <FormControl>
                                <CreatableSelect
                                    className="text-sm" 
                                    placeholder="Pilih atau ketik kategori baru"
                                    isDisabled={disabled}
                                    options={categoryOptions}
                                    value={categoryOptions.find(opt => opt.value === field.value) || null}
                                    onChange={(option) => field.onChange(option?.value || null)}
                                    onCreateOption={(inputValue) => field.onChange(inputValue)}
                                    isClearable
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                /> */}

                <FormField
                    name="paymentMethodId" 
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Metode Pembayaran</FormLabel>
                            <FormControl>
                                <CreatableSelect
                                    className="text-sm"
                                    placeholder="Pilih metode pembayaran"
                                    isDisabled={disabled}
                                    options={paymentMethodOptions} 
                                    value={paymentMethodOptions.find(opt => opt.value === field.value) || null}
                                    onChange={(option) => field.onChange(option?.value || null)}
                                    onCreateOption={(inputValue) => field.onChange(inputValue)}
                                    isClearable
                                    required
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="amount"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Jumlah Uang</FormLabel>
                            <FormControl>
                                <CurrencyInput
                                    id="amount"
                                    name={field.name}
                                    placeholder="Rp 0"
                                    disabled={disabled}
                                    customInput={Input}
                                    prefix="Rp "
                                    groupSeparator="."
                                    decimalSeparator=","
                                    decimalsLimit={2}
                                    value={field.value}
                                    onValueChange={(value) => field.onChange(value === undefined ? "" : value)}
                                    required
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* <FormField
                    name="note"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Catatan (Opsional)</FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    value={field.value ?? ""} 
                                    disabled={disabled}
                                    placeholder="Tulis catatan tambahan..."
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                /> */}

                <Button className="w-full" disabled={disabled}>
                    {disabled ? <Loader2 className="size-4 animate-spin" /> : (isEdit? "Simpan Perubahan" : "Buat Transaksi")}
                </Button>
            </form>
        </Form>
    );
}
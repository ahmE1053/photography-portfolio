import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, CheckIcon, StarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

interface PackageProps {
  title: string;
  price: string;
  features: string[];
  popular?: boolean;
}

const PackagesSection = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string>("");

  const packages: PackageProps[] = [
    {
      title: "الباقة الأساسية",
      price: "٢٥٠٠ جنيه",
      features: [
        "تصوير لمدة ٣ ساعات",
        "١٠٠ صورة معدلة",
        "ألبوم رقمي",
        "تسليم الصور خلال أسبوع",
      ],
    },
    {
      title: "الباقة الفضية",
      price: "٤٥٠٠ جنيه",
      features: [
        "تصوير لمدة ٥ ساعات",
        "٢٠٠ صورة معدلة",
        "ألبوم مطبوع + رقمي",
        "فيديو قصير للحظات مميزة",
        "تسليم الصور خلال ٥ أيام",
      ],
      popular: true,
    },
    {
      title: "الباقة الذهبية",
      price: "٧٠٠٠ جنيه",
      features: [
        "تصوير ليوم كامل",
        "٣٥٠ صورة معدلة",
        "ألبوم فاخر مطبوع + رقمي",
        "فيديو كامل للمناسبة",
        "جلسة تصوير إضافية",
        "تسليم الصور خلال ٣ أيام",
      ],
    },
  ];

  const handleBooking = (packageTitle: string) => {
    setSelectedPackage(packageTitle);
    setOpenDialog(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the form submission
    setOpenDialog(false);
    // Show success message or redirect
  };

  return (
    <section id="packages" className="py-16 px-4 bg-slate-50 rtl" dir="rtl">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">باقات التصوير</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            اختار الباقة اللي تناسبك من مجموعة باقاتنا المميزة للأفراح
            والمناسبات السعيدة
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className={cn(
                  "h-full flex flex-col relative",
                  pkg.popular ? "border-primary shadow-lg" : "",
                )}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-primary text-white py-1 px-3 rounded-bl-lg rounded-tr-lg text-sm font-medium z-10">
                    الأكثر طلباً
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl">{pkg.title}</CardTitle>
                  <CardDescription className="text-2xl font-bold mt-2">
                    {pkg.price}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-2">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckIcon className="h-5 w-5 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => handleBooking(pkg.title)}
                    className="w-full"
                    variant={pkg.popular ? "default" : "outline"}
                  >
                    احجز الآن
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="sm:max-w-[425px] rtl" dir="rtl">
            <DialogHeader>
              <DialogTitle>حجز {selectedPackage}</DialogTitle>
              <DialogDescription>
                املأ البيانات التالية لحجز الباقة وهنتواصل معاك في أقرب وقت
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">الاسم</Label>
                  <Input id="name" placeholder="الاسم بالكامل" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">رقم الموبايل</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="01xxxxxxxxx"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>تاريخ المناسبة</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-right font-normal",
                          !date && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="ml-2 h-4 w-4" />
                        {date ? (
                          format(date, "PPP", { locale: ar })
                        ) : (
                          <span>اختر تاريخ</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="notes">ملاحظات إضافية</Label>
                  <Textarea
                    id="notes"
                    placeholder="أي تفاصيل إضافية عن المناسبة..."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">تأكيد الحجز</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center bg-white p-8 rounded-lg shadow-md"
        >
          <h3 className="text-xl font-bold mb-4 flex items-center justify-center gap-2">
            <StarIcon className="h-6 w-6 text-yellow-500" />
            باقات خاصة
            <StarIcon className="h-6 w-6 text-yellow-500" />
          </h3>
          <p className="text-gray-600 mb-6">
            عندك مناسبة خاصة ومحتاج باقة مخصصة؟ تواصل معانا وهنصمم لك عرض خاص
            يناسب احتياجاتك
          </p>
          <Button
            variant="outline"
            onClick={() => (window.location.href = "#contact")}
          >
            تواصل معانا
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default PackagesSection;

import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ContactFormProps {
  className?: string;
}

const ContactForm = ({ className = "" }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">(
    "idle",
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save to Supabase
      const { error } = await supabase.from("contact_requests").insert([
        {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          message: formData.message,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) throw error;

      setIsSubmitting(false);
      setFormStatus("success");
      // Reset form after successful submission
      setFormData({ name: "", phone: "", email: "", message: "" });

      // Reset status after 5 seconds
      setTimeout(() => setFormStatus("idle"), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitting(false);
      setFormStatus("error");

      // Reset error status after 5 seconds
      setTimeout(() => setFormStatus("idle"), 5000);
    }
  };

  return (
    <div
      className={`w-full max-w-4xl mx-auto py-12 px-4 bg-background ${className}`}
      id="contact"
    >
      <div className="text-center mb-8 rtl">
        <h2 className="text-3xl font-bold mb-2">تواصل معانا</h2>
        <p className="text-muted-foreground">
          عايز تحجز جلسة تصوير أو عندك أي استفسار؟ ابعتلنا رسالة وهنرد عليك في
          أقرب وقت
        </p>
      </div>

      <Card className="rtl">
        <CardHeader>
          <CardTitle>نموذج التواصل</CardTitle>
          <CardDescription>
            املي البيانات دي وهنتواصل معاك في أقرب وقت
          </CardDescription>
        </CardHeader>
        <CardContent>
          {formStatus === "success" && (
            <Alert className="mb-6 bg-green-50 border-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-600">
                تم استلام رسالتك بنجاح! هنرد عليك قريب
              </AlertDescription>
            </Alert>
          )}

          {formStatus === "error" && (
            <Alert className="mb-6 bg-red-50 border-red-200">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-600">
                حصل مشكلة في إرسال الرسالة، حاول تاني بعد شوية
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">الاسم</Label>
              <Input
                id="name"
                name="name"
                placeholder="اكتب اسمك هنا"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">رقم الموبايل</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="اكتب رقم موبايلك"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="اكتب إيميلك"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">الرسالة</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="اكتب رسالتك هنا"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <CardFooter className="px-0 pt-4">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "جاري الإرسال..." : "إرسال الرسالة"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>

      <div className="mt-8 text-center rtl">
        <p className="text-muted-foreground">أو تقدر تتواصل معانا مباشرة على</p>
        <div className="flex justify-center gap-4 mt-2 flex-wrap">
          <div className="flex items-center gap-1">
            <span className="font-medium">📱 موبايل:</span>
            <a
              href="tel:+201234567890"
              className="text-primary hover:underline"
            >
              01234567890
            </a>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-medium">📧 إيميل:</span>
            <a
              href="mailto:info@example.com"
              className="text-primary hover:underline"
            >
              info@example.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;

import React from "react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  image: string;
  rating: number;
  text: string;
  event: string;
}

const TestimonialsSection = ({
  testimonials = defaultTestimonials,
}: {
  testimonials?: Testimonial[];
}) => {
  return (
    <section
      id="testimonials"
      className="py-16 px-4 md:px-8 lg:px-16 bg-slate-50 rtl"
    >
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-right">
            آراء العملاء
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-right">
            شوف إيه اللي بيقوله عملائنا عن تجربتهم معانا في تصوير أجمل لحظات
            حياتهم
          </p>
        </motion.div>

        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.id}
                className="md:basis-1/2 lg:basis-1/3 pl-4"
              >
                <div className="p-1">
                  <Card className="border-2 border-gray-100">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12 border-2 border-primary">
                            <AvatarImage
                              src={testimonial.image}
                              alt={testimonial.name}
                            />
                            <AvatarFallback>
                              {testimonial.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="text-right">
                            <h4 className="font-semibold">
                              {testimonial.name}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {testimonial.event}
                            </p>
                          </div>
                        </div>
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 text-right">
                        {testimonial.text}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-2 mt-8">
            <CarouselPrevious className="relative static transform-none translate-y-0 mx-2" />
            <CarouselNext className="relative static transform-none translate-y-0 mx-2" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "أحمد محمود",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed",
    rating: 5,
    text: "الصور طلعت تحفة بجد، كل اللقطات كانت مميزة وعبرت عن فرحتنا. الفوتوغرافر كان محترف جداً وعرف يلتقط أحلى اللحظات بدون ما نحس إنه موجود. هنتعامل معاه تاني أكيد!",
    event: "حفل زفاف",
  },
  {
    id: 2,
    name: "سارة علي",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara",
    rating: 5,
    text: "مش عارفة أشكره إزاي على الشغل الرائع ده! صور الخطوبة بتاعتنا طلعت أحلى من اللي كنت متخيلاه. كان متعاون جداً ومريح في التعامل وفاهم شغله كويس.",
    event: "حفل خطوبة",
  },
  {
    id: 3,
    name: "محمد خالد",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohamed",
    rating: 4,
    text: "تجربة ممتازة وصور حلوة جداً. الألبوم طلع شيك أوي والصور كلها واضحة وألوانها طبيعية. بس كان في تأخير بسيط في تسليم الصور، غير كده كله تمام.",
    event: "جلسة تصوير عائلية",
  },
  {
    id: 4,
    name: "نورا حسن",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nora",
    rating: 5,
    text: "من أحسن المصورين اللي اتعاملت معاهم. فاهم الإضاءة كويس جداً وبيعرف يختار أحلى الزوايا. الصور طلعت زي الأفلام بالظبط وكل اللي شافوها انبهروا بيها.",
    event: "حفل زفاف",
  },
  {
    id: 5,
    name: "كريم سامي",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Karim",
    rating: 5,
    text: "تعاملت معاه في تصوير حفلة عيد ميلاد بنتي وكانت تجربة ممتازة. عرف يتعامل مع الأطفال بطريقة حلوة وطلع صور عفوية جميلة. هنكرر التجربة تاني أكيد.",
    event: "حفلة عيد ميلاد",
  },
];

export default TestimonialsSection;

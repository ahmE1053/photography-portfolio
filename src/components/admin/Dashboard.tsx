import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

interface ContactRequest {
  id: number;
  name: string;
  phone: string;
  email: string;
  message: string;
  created_at: string;
}

const Dashboard = () => {
  const [requests, setRequests] = useState<ContactRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("contact_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (error) {
      console.error("Error fetching contact requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("isAuthenticated");
    window.location.reload();
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "PPpp", { locale: ar });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="container mx-auto py-8 px-4" dir="rtl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">لوحة التحكم - طلبات التواصل</h1>
        <Button onClick={handleLogout} variant="outline">
          تسجيل الخروج
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>طلبات التواصل</CardTitle>
          <CardDescription>
            قائمة بجميع طلبات التواصل المرسلة من الموقع
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">جاري التحميل...</div>
          ) : requests.length === 0 ? (
            <div className="text-center py-8">لا توجد طلبات تواصل حتى الآن</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>الاسم</TableHead>
                    <TableHead>رقم الموبايل</TableHead>
                    <TableHead>البريد الإلكتروني</TableHead>
                    <TableHead>الرسالة</TableHead>
                    <TableHead>تاريخ الإرسال</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">
                        {request.name}
                      </TableCell>
                      <TableCell>
                        <a
                          href={`tel:${request.phone}`}
                          className="text-primary hover:underline"
                        >
                          {request.phone}
                        </a>
                      </TableCell>
                      <TableCell>
                        <a
                          href={`mailto:${request.email}`}
                          className="text-primary hover:underline"
                        >
                          {request.email}
                        </a>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {request.message}
                      </TableCell>
                      <TableCell>{formatDate(request.created_at)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;

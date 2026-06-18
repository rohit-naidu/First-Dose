"use client";
import { useRouter } from "next/navigation";
import IntakeFormCore from "@/components/demo/IntakeFormCore";

export default function IntakePage() {
  const router = useRouter();
  return <IntakeFormCore onComplete={() => router.push("/demo/clinician")} mode="patient" />;
}

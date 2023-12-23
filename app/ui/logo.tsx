import { AcademicCapIcon } from "@heroicons/react/24/outline";
import { beVietnamPro } from "@/app/ui/fonts";

export default function Logo() {
  return (
    <div
      className={`${beVietnamPro.className} flex flex-row items-center leading-none text-white`}
    >
      <AcademicCapIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[16px]">School Management</p>
    </div>
  );
}

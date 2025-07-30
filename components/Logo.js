import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center space-x-1 w-full justify-center">
      {/* <span className="text-2xl font-bold text-gray-900">Maxed</span>
      <span className="text-red-500 text-lg">*</span> */}
      <Image src="/Logo.png" alt="Logo" width={100} height={100} />
    </div>
  );
} 
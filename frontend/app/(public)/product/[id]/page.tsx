import Image from "next/image";

function page() {
  return (
    <div className="grid grid-cols-3">
      <div className="col-span-1">
        <Image
          src={"/images/products/shoes/shoes-casual-mens.webp"}
          alt={"picture"}
          width={100}
          height={100}
        />
      </div>
      <div className="col-span-1"></div>
      <div className="col-span-1"></div>
    </div>
  );
}

export default page;

import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-gra">
      Olá, eu sou o Augusto!
        <Image
            src='/svgs/Bigfoot-pana.svg'
            width={500}
            height={500}
            alt="Bigfoot"
        />
    </div>
  );
}

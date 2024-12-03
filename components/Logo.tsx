import Image from 'next/image';

export function Logo() {
  return (
    <div className="text-center">
      <Image
        src="https://images.lawpath.com.au/2022/09/lawpath-logo.svg"
        alt="Lawpath Logo"
        width={200}
        height={50}
        className="mx-auto mb-8"
      />
    </div>
  );
}


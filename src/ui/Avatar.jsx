import Image from "next/image";

function Avatar({ src, size = 24 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
      }}
      className={`relative overflow-hidden rounded-full ring-1 ring-secondary-300`}
    >
      <Image
        src={src || "/images/avatar.png"}
        fill
        priority
        className="object-cover"
        alt="user avatar"
      />
    </div>
  );
}
export default Avatar;

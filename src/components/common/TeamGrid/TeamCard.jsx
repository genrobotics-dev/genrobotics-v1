import Image from "next/image";
import { BsLinkedin } from "react-icons/bs";

export default function TeamCard({ member }) {
  return (
    <div className="bg-[#111] rounded-xl overflow-hidden hover:scale-105 transition duration-300">

      <div className="relative w-full aspect-[3/4]">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="text-white font-semibold text-lg md:text-lg uppercase">
          {member.name}
        </h3>
        <p className="text-[#FFFFFF] text-xs">{member.role}</p>

        {/* LinkedIn icon */}
        {member.social && (
          <a
            href={member.social}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${member.name}'s LinkedIn profile`}
            className="inline-flex items-center mt-3 hover:text-blue-800 hover:bg-white"
          >
            <BsLinkedin size={20} />
          </a>
        )}

        {/* Investor logo image */}
        {member.logo && (
          <div className="flex items-center gap-2 mt-3">
            <img src={member.logo} alt="logo" className="w-20 h-auto" />
          </div>
        )}
      </div>
    </div>
  );
}

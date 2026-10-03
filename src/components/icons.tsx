/**
 * Ikon navigasi.
 *
 * Ditulis sebagai SVG sebaris, bukan dari pustaka luar, agar MVP tetap
 * tanpa ketergantungan pihak ketiga. Bentuknya sengaja geometris dan
 * berisi penuh, mengikuti gaya ikon pada templat Genesis.
 */

type IconProps = { className?: string };

const box = {
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": true as const,
};

export function IconBeranda({ className }: IconProps) {
  return (
    <svg {...box} className={className}>
      <path d="M2.5 3.5A1.5 1.5 0 0 1 4 2h4a1.5 1.5 0 0 1 1.5 1.5v4A1.5 1.5 0 0 1 8 9H4a1.5 1.5 0 0 1-1.5-1.5v-4Z" />
      <path d="M10.5 3.5A1.5 1.5 0 0 1 12 2h4a1.5 1.5 0 0 1 1.5 1.5v2A1.5 1.5 0 0 1 16 7h-4a1.5 1.5 0 0 1-1.5-1.5v-2Z" />
      <path d="M2.5 11.5A1.5 1.5 0 0 1 4 10h4a1.5 1.5 0 0 1 1.5 1.5v5A1.5 1.5 0 0 1 8 18H4a1.5 1.5 0 0 1-1.5-1.5v-5Z" />
      <path d="M10.5 9.5A1.5 1.5 0 0 1 12 8h4a1.5 1.5 0 0 1 1.5 1.5v7A1.5 1.5 0 0 1 16 18h-4a1.5 1.5 0 0 1-1.5-1.5v-7Z" />
    </svg>
  );
}

export function IconSurvei({ className }: IconProps) {
  return (
    <svg {...box} className={className}>
      <path d="M7 2a1 1 0 0 0-1 1v.5H5A1.5 1.5 0 0 0 3.5 5v12A1.5 1.5 0 0 0 5 18.5h10a1.5 1.5 0 0 0 1.5-1.5V5A1.5 1.5 0 0 0 15 3.5h-1V3a1 1 0 0 0-1-1H7Zm-.75 7.75a.75.75 0 0 1 1.06 0l.44.44 1.69-1.69a.75.75 0 1 1 1.06 1.06l-2.22 2.22a.75.75 0 0 1-1.06 0l-.97-.97a.75.75 0 0 1 0-1.06ZM12 10.5a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75Zm-5.75 3.75a.75.75 0 0 1 .75-.75h7a.75.75 0 0 1 0 1.5H7a.75.75 0 0 1-.75-.75Z" />
    </svg>
  );
}

export function IconDiagnosis({ className }: IconProps) {
  return (
    <svg {...box} className={className}>
      <path
        fillRule="evenodd"
        d="M10 1.25a.75.75 0 0 1 .75.75v1.31a6.5 6.5 0 0 1 5.94 5.94H18a.75.75 0 0 1 0 1.5h-1.31a6.5 6.5 0 0 1-5.94 5.94V18a.75.75 0 0 1-1.5 0v-1.31a6.5 6.5 0 0 1-5.94-5.94H2a.75.75 0 0 1 0-1.5h1.31a6.5 6.5 0 0 1 5.94-5.94V2a.75.75 0 0 1 .75-.75Zm0 3.75a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z"
        clipRule="evenodd"
      />
      <circle cx="10" cy="10" r="2.25" />
    </svg>
  );
}

export function IconKalkulator({ className }: IconProps) {
  return (
    <svg {...box} className={className}>
      <path
        fillRule="evenodd"
        d="M5 1.5A1.5 1.5 0 0 0 3.5 3v14A1.5 1.5 0 0 0 5 18.5h10a1.5 1.5 0 0 0 1.5-1.5V3A1.5 1.5 0 0 0 15 1.5H5Zm.75 2.75A.75.75 0 0 1 6.5 3.5h7a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-.75.75h-7a.75.75 0 0 1-.75-.75v-2ZM7 9.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm3 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm3 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2ZM7 13a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm3 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm3 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function IconPetaJalan({ className }: IconProps) {
  return (
    <svg {...box} className={className}>
      <path d="M12.75 3.25a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0ZM2.75 10a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0Zm10 6.75a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0Z" />
      <path d="M7.75 3.25a.75.75 0 0 1 .75-.75h3.1a.75.75 0 0 1 0 1.5H8.5a.75.75 0 0 1-.75-.75Zm0 13.5a.75.75 0 0 1 .75-.75h3.1a.75.75 0 0 1 0 1.5H8.5a.75.75 0 0 1-.75-.75ZM5 5.25a.75.75 0 0 1 .75.75v1.75a.75.75 0 0 1-1.5 0V6A.75.75 0 0 1 5 5.25Zm0 6.75a.75.75 0 0 1 .75.75V14a.75.75 0 0 1-1.5 0v-1.25a.75.75 0 0 1 .75-.75Z" />
    </svg>
  );
}

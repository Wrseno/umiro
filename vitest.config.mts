import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

/**
 * Alias `@/` disalin dari `tsconfig.json` agar uji dapat memuat berkas yang
 * memakainya. Modul di `src/lib` seluruhnya memakai jalur relatif, tetapi
 * komponen di `src/components` mengikuti kebiasaan Next.js dan memakai
 * alias; tanpa padanan di sini, uji perenderan komponen gagal memuat.
 */
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});

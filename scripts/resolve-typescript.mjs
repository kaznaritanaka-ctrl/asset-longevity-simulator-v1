const TYPESCRIPT_SUFFIXES = [".ts", ".tsx", "/index.ts", "/index.tsx"];

export async function resolve(specifier, context, nextResolve) {
  try {
    return await nextResolve(specifier, context);
  } catch (error) {
    const isRelative = specifier.startsWith("./") || specifier.startsWith("../");
    if (!isRelative || error?.code !== "ERR_MODULE_NOT_FOUND") throw error;

    for (const suffix of TYPESCRIPT_SUFFIXES) {
      try {
        return await nextResolve(`${specifier}${suffix}`, context);
      } catch (candidateError) {
        if (candidateError?.code !== "ERR_MODULE_NOT_FOUND") throw candidateError;
      }
    }
    throw error;
  }
}

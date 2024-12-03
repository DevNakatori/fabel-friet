export const getImageUrl = (ref) => {
    const baseRef = ref.slice(6);
    const fileExtension = baseRef.includes('-svg')
        ? '.svg'
        : baseRef.includes('-png')
            ? '.png'
            : baseRef.includes('-jpg')
                ? '.jpg'
                : baseRef.includes('-webp')
                    ? '.webp'
                    : '';
    const formattedRef = baseRef
        .replace('-svg', fileExtension)
        .replace('-png', fileExtension)
        .replace('-jpg', fileExtension)
        .replace('-webp', fileExtension);
   // return `https://cdn.sanity.io/images/6tlmpa5b/development/${formattedRef}`;
   return `https://cdn.sanity.io/images/6tlmpa5b/production/${formattedRef}`;
};

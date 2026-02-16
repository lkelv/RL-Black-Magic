export const formatProductKey = (value) => {
    const uppercased = value.toUpperCase();
    // Clean everything except alphanumeric and dashes
    const cleanedWithDashes = uppercased.replace(/[^A-Z0-9-]/g, '');
    // Clean to just alphanumeric
    const cleanedNoDashes = uppercased.replace(/[^A-Z0-9]/g, '');

    // Check if dashes are in correct positions (index 3 and 7)
    const firstDashCorrect = cleanedWithDashes.length <= 3 || cleanedWithDashes[3] === '-';
    const secondDashCorrect = cleanedNoDashes.length <= 6 || cleanedWithDashes[7] === '-';
    const dashesCorrect = firstDashCorrect && secondDashCorrect;

    if (cleanedWithDashes.includes('-') && dashesCorrect) {
        // Dashes in correct positions - preserve them
        return cleanedWithDashes.slice(0, 11);
    } else {
        // No dashes or wrong positions - add them automatically
        const formatted = cleanedNoDashes.match(/.{1,3}/g)?.join('-') || '';
        return formatted.slice(0, 11);
    }
};
export function getEnumOptions<T>(
    obj: Record<string, T>,
    getTranslatedLabel: (label: T) => string
) {
    return Object.values(obj).map((value) => ({
        label: getTranslatedLabel(value),
        value,
    }))
}


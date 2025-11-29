function reverseChronologicalSort(a: Date, b: Date) {
    return b.valueOf() - a.valueOf();
}

export default reverseChronologicalSort;

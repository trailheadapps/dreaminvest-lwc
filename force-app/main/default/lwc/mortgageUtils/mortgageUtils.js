const calculateMonthlyPayment = (principal, years, rate) => {
    if (principal && years && rate && rate > 0) {
        const monthlyRate = rate / 100 / 12;
        const monthlyPayment =
            (principal * monthlyRate) /
            (1 - Math.pow(1 / (1 + monthlyRate), years * 12));
        return monthlyPayment;
    }
    return 0;
};

export { calculateMonthlyPayment };

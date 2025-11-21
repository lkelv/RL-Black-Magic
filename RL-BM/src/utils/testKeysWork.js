// src/utils/testProductKeys.js
// -------------------------------------------------------
// FIXED Test script for verifying product key validity
// -------------------------------------------------------

import {
    generateRandomProductKeyString,
    deriveMathKeyFromProductKey,
    validateMathRules,
    validateProductKey,
    backtrackValidationKey
} from "./pktry.js";

/**
 * Test a single product key with detailed output
 */
export const testOneKey = (productKey) => {
    console.log("\n" + "=".repeat(60));
    console.log(`🔑 TESTING PRODUCT KEY: ${productKey}`);
    console.log("=".repeat(60));

    const mathKey = deriveMathKeyFromProductKey(productKey);
    const mathValid = validateMathRules(mathKey);
    const fullValid = validateProductKey(productKey);
    const backtrack = backtrackValidationKey(mathKey);

    console.log(`\n📟 Derived Math Key: ${mathKey}`);
    console.log(`📊 Digits: [${backtrack.digits.join(", ")}]`);
    console.log(`\n📘 Math Rules Validation: ${mathValid ? "✅ PASS" : "❌ FAIL"}`);

    console.log("\n🔍 Rule Breakdown:");
    console.log(`  Rule 1 (D1*D2=24 OR D1+D2=10): ${backtrack.checks.rule1_pass ? "✅" : "❌"}`);
    console.log(`    → D1*D2 = ${backtrack.checks.rule1_mult}, D1+D2 = ${backtrack.checks.rule1_add}`);

    console.log(`  Rule 2 (D3+D4=7 OR D3*D4=12): ${backtrack.checks.rule2_pass ? "✅" : "❌"}`);
    console.log(`    → D3+D4 = ${backtrack.checks.rule2_add}, D3*D4 = ${backtrack.checks.rule2_mult}`);

    console.log(`  Rule 3 (D5+D6=D1 OR (D5*D6)%10=D2): ${backtrack.checks.rule3_pass ? "✅" : "❌"}`);
    console.log(`    → D5+D6 = ${backtrack.checks.rule3_add}, (D5*D6)%10 = ${backtrack.checks.rule3_mod}`);

    console.log(`  Rule 4 (D5+D6+D7=15): ${backtrack.checks.rule4_pass ? "✅" : "❌"}`);
    console.log(`    → D5+D6+D7 = ${backtrack.checks.rule4_sum}`);

    console.log(`  Rule 5 (D8-D9=1): ${backtrack.checks.rule5_pass ? "✅" : "❌"}`);
    console.log(`    → D8-D9 = ${backtrack.checks.rule5_sub}`);

    console.log(`  Rule 6 (D2=D6%9): ${backtrack.checks.rule6_pass ? "✅" : "❌"}`);
    console.log(`    → D2 = ${backtrack.checks.rule6_d2}, D6%9 = ${backtrack.checks.rule6_d6mod}`);

    console.log(`\n🏁 Final Result: ${fullValid.valid ? "✅ VALID" : "❌ INVALID"}`);
    console.log(`   Message: ${fullValid.message}`);
    console.log("=".repeat(60) + "\n");

    return {
        productKey,
        mathKey,
        mathValid,
        fullValid,
        backtrack
    };
};

/**
 * Test N random product keys and show statistics
 */
export const testMultipleKeys = (count = 20) => {
    console.log("\n" + "=".repeat(60));
    console.log(`🧪 TESTING ${count} RANDOM PRODUCT KEYS`);
    console.log("=".repeat(60) + "\n");

    const results = [];
    for (let i = 0; i < count; i++) {
        const pk = generateRandomProductKeyString();
        console.log(`\n[${i + 1}/${count}] Testing: ${pk}`);

        const result = {
            productKey: pk,
            mathKey: deriveMathKeyFromProductKey(pk),
            mathValid: validateMathRules(deriveMathKeyFromProductKey(pk))
        };

        results.push(result);

        if (result.mathValid) {
            console.log(`  ✅ VALID! Math Key: ${result.mathKey}`);
        } else {
            console.log(`  ❌ Invalid - Math Key: ${result.mathKey}`);
        }
    }

    const valids = results.filter(r => r.mathValid === true);
    const validPercent = ((valids.length / count) * 100).toFixed(2);

    console.log("\n" + "=".repeat(60));
    console.log("📊 TEST RESULTS SUMMARY");
    console.log("=".repeat(60));
    console.log(`🟢 Valid Keys: ${valids.length}/${count} (${validPercent}%)`);
    console.log(`🔴 Invalid Keys: ${count - valids.length}/${count} (${(100 - validPercent).toFixed(2)}%)`);

    if (valids.length > 0) {
        console.log("\n✨ Valid Keys Found:");
        valids.forEach((v, idx) => {
            console.log(`  ${idx + 1}. ${v.productKey} → ${v.mathKey}`);
        });
    }

    console.log("=".repeat(60) + "\n");

    return results;
};

/**
 * Test specific known keys
 */
export const testKnownKeys = () => {
    console.log("\n🔬 Testing Known Product Keys\n");

    const knownKeys = [
        "K7LP-9FQM-Z8RD",
        "AAAA-AAAA-AAAA",
        "ZZZZ-ZZZZ-ZZZZ",
        "2222-3333-4444"
    ];

    knownKeys.forEach(key => testOneKey(key));
};

/**
 * Analyze the mathematical distribution
 */
export const analyzeDistribution = (sampleSize = 1000) => {
    console.log(`\n📈 Analyzing distribution over ${sampleSize} random keys...\n`);

    let validCount = 0;
    const digitFrequency = Array(10).fill(0);

    for (let i = 0; i < sampleSize; i++) {
        const pk = generateRandomProductKeyString();
        const mk = deriveMathKeyFromProductKey(pk);

        if (validateMathRules(mk)) {
            validCount++;
        }

        // Track digit frequency
        mk.split("").forEach(d => {
            digitFrequency[parseInt(d)]++;
        });

        if ((i + 1) % 100 === 0) {
            console.log(`  Processed ${i + 1}/${sampleSize}...`);
        }
    }

    console.log("\n📊 Results:");
    console.log(`  Valid keys found: ${validCount}/${sampleSize}`);
    console.log(`  Success rate: ${(validCount / sampleSize * 100).toFixed(4)}%`);
    console.log(`  Estimated attempts per valid key: ${Math.round(sampleSize / validCount)}`);

    console.log("\n🔢 Digit frequency distribution:");
    digitFrequency.forEach((freq, digit) => {
        const bar = "█".repeat(Math.round(freq / (sampleSize * 0.9)));
        console.log(`  ${digit}: ${freq.toString().padStart(5)} ${bar}`);
    });
};

// Export main test function
export const runAllTests = () => {
    console.log("\n🚀 Running Complete Test Suite\n");

    console.log("1️⃣ Testing known keys...");
    testKnownKeys();

    console.log("\n2️⃣ Testing random keys...");
    testMultipleKeys(10);

    console.log("\n3️⃣ Analyzing distribution...");
    analyzeDistribution(1000);

    console.log("\n✅ All tests complete!");
};

// For browser testing
if (typeof window !== "undefined") {
    console.log("🌐 Product Key Test Module Loaded");
    console.log("Run testOneKey('YOUR-KEY-HERE') to test a specific key");
    console.log("Run testMultipleKeys(N) to test N random keys");
}

// Test the example key from your code
console.log("\n📝 Testing your example key:");
testOneKey("K7LP-9FQM-Z8RD");
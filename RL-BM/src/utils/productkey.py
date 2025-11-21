"""
Product Key Generator - Python Implementation
Generates 9-character alphanumeric keys using mathematical transformation
"""

import numpy as np
import random
import string
from typing import List, Dict, Tuple
import hashlib
import pandas as pd

# Configuration
KEY_LENGTH = 9
CHARS = string.ascii_uppercase + string.digits  # A-Z, 0-9


def apply_formula(x: float) -> float:
    """
    Apply the transformation formula: y = sqrt(sinh(log(2x)/e^x + mod(x,10))) * x

    Args:
        x: Input value

    Returns:
        Transformed value
    """
    try:
        if not np.isfinite(x) or x == 0:
            return 0.0

        # Calculate each component
        log_2x = np.log(2 * abs(x))
        exp_x = np.exp(min(x % 20, 20))  # Clamp to prevent overflow
        mod_x = np.mod(x, 10)

        # sinh(log(2x)/e^x + mod(x,10))
        sinh_arg = (log_2x / exp_x) + mod_x
        sinh_value = np.sinh(sinh_arg)

        # sqrt(sinh(...))
        if sinh_value < 0:
            return 0.0

        sqrt_value = np.sqrt(sinh_value)

        # Multiply by x
        result = sqrt_value * x

        return abs(result) if np.isfinite(result) else 0.0

    except (ValueError, RuntimeWarning, FloatingPointError):
        return 0.0


def convert_to_alphanumeric(number: float) -> str:
    """
    Convert a number to a 9-character alphanumeric string

    Args:
        number: The number to convert

    Returns:
        9-character alphanumeric string
    """
    # Convert to integer representation
    int_value = int(abs(number) * 1e15) % (36 ** KEY_LENGTH)

    # Convert to base-36 (0-9, A-Z)
    result = []
    base = len(CHARS)

    for _ in range(KEY_LENGTH):
        result.append(CHARS[int_value % base])
        int_value //= base

    return ''.join(result)


def generate_product_key_from_seed(seed: int) -> Tuple[str, float, float]:
    """
    Generate a product key from a seed value

    Args:
        seed: Integer seed value

    Returns:
        Tuple of (product_key, intermediate_value, final_value)
    """
    # Apply transformations (matching your logic)
    i = seed + 2
    i *= 5
    i = np.log(i)

    # Apply formula
    y_value = apply_formula(i)

    # Convert to alphanumeric key
    product_key = convert_to_alphanumeric(y_value)

    return product_key, i, y_value


def generate_multiple_keys(count: int, start_seed: int = 0) -> List[Dict[str, any]]:
    """
    Generate multiple product keys in sequence

    Args:
        count: Number of keys to generate
        start_seed: Starting seed value (default: 0)

    Returns:
        List of dictionaries containing key information
    """
    keys = []

    print(f"Generating {count} Product Keys")

    for i in range(count):
        seed = start_seed + (i*67)  # Increment by 5 as in your original code
        product_key, intermediate, final_value = generate_product_key_from_seed(seed)

        key_info = {
            'index': i + 1,
            'product_key': product_key,
            'seed': seed,
            'intermediate_value': intermediate,
            'final_value': final_value
        }

        keys.append(key_info)

        # Print progress
        print(f"[{i + 1}/{count}] Key: {product_key} | Seed: {seed}")



    return keys


def format_product_key(key: str, format_style: str = 'dash') -> str:
    """
    Format the product key with separators

    Args:
        key: 9-character key
        format_style: 'dash' (XXX-XXX-XXX) or 'none' (XXXXXXXXX)

    Returns:
        Formatted key string
    """
    if format_style == 'dash' and len(key) == 9:
        return f"{key[0:3]}-{key[3:6]}-{key[6:9]},{False}"
    return key


def display_key_info(key_dict: Dict[str, any], formatted: bool = True):
    """
    Display detailed information about a generated key

    Args:
        key_dict: Dictionary containing key information
        formatted: Whether to format with dashes
    """
    key = key_dict['product_key']
    if formatted:
        key = format_product_key(key)

    print(f"\n{'=' * 70}")
    print(f"Product Key: {key}")
    print(f"{'-' * 70}")
    if 'seed' in key_dict:
        print(f"Seed Value: {key_dict['seed']}")
    if 'input_string' in key_dict:
        print(f"Generated From: {key_dict['input_string']}")
    if 'intermediate_value' in key_dict:
        print(f"Intermediate: {key_dict['intermediate_value']:.6f}")
    if 'final_value' in key_dict:
        print(f"Final Value: {key_dict['final_value']:.6f}")
    print(f"{'=' * 70}\n")


def export_keys_to_file(keys: List[Dict], filename: str = 'product_keys.txt'):
    """
    Export generated keys to a text file

    Args:
        keys: List of key dictionaries
        filename: Output filename
    """
    with open(filename, 'w') as f:
        f.write("Product Key Generator - Export\n")
        f.write("=" * 70 + "\n\n")

        for key_dict in keys:
            formatted_key = format_product_key(key_dict['product_key'])
            f.write(f"{formatted_key}\n")

        f.write(f"\n{'=' * 70}\n")
        f.write(f"Total Keys: {len(keys)}\n")

    print(f"✅ Exported {len(keys)} keys to {filename}")


def validate_key_format(key: str) -> bool:
    """
    Validate that a key has the correct format

    Args:
        key: Product key to validate

    Returns:
        True if valid format, False otherwise
    """
    # Remove dashes if present
    clean_key = key.replace('-', '')

    # Check length
    if len(clean_key) != KEY_LENGTH:
        return False

    # Check all characters are alphanumeric
    if not all(c in CHARS for c in clean_key):
        return False

    return True


# =====================================================
# MAIN DEMONSTRATION
# =====================================================

def main():
    """Main demonstration of the product key generator"""

    print("\n" + "=" * 70)
    print(" " * 20 + "PRODUCT KEY GENERATOR")
    print("=" * 70)

    # Example 2: Generate from seed sequence
    print("\n[2] Generating 10 Sequential Keys (like your original code):")
    print("-" * 70)
    keys = generate_multiple_keys(60000, start_seed=0)
    export_keys_to_file(keys, 'generated_keys60000.txt')


if __name__ == "__main__":
    main()
    productkeylist = np.genfromtxt("generated_keys60000.txt",delimiter='\t',skip_header=3,skip_footer=2,dtype=str)
    # print(productkeylist)

    mm = []
    sm = []
    mmsm = []
    for productkey in productkeylist:
        productkey = productkey.split("-")
        productkey = "".join(productkey)
        # print(productkey)
        sumord = 0
        for i in productkey:
            sumord += ord(i)

        classifier = np.mod(sumord,3)

        if classifier == 0:
            mm.append(productkey)

        elif classifier == 1:
            sm.append(productkey)

        elif classifier == 2:
            mmsm.append(productkey)

    print(mm)
    print(sm)
    print(mmsm)
    dfmm = pd.DataFrame(mm)
    dfmm.to_csv('mm.csv', index=False, encoding='utf-8')
    dfsm = pd.DataFrame(sm)
    dfsm.to_csv('sm.csv', index=False, encoding='utf-8')
    dfmmsm = pd.DataFrame(mmsm)
    dfmmsm.to_csv('mmsm.csv', index=False, encoding='utf-8')



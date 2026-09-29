import urllib.request
import sys

BASE_URL = "https://paas-static-cloudflare.bamaground.workers.dev"

endpoints = [
    ("/", 200, "text/html"),
    ("/style.css", 200, "text/css"),
    ("/script.js", 200, "application/javascript"),
]

all_passed = True

for path, expected_status, expected_ct_prefix in endpoints:
    url = f"{BASE_URL}{path}"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "DevOpsSmokeTest/1.0"})
        with urllib.request.urlopen(req, timeout=10) as resp:
            status = resp.status
            content_type = resp.headers.get("Content-Type", "")
            data = resp.read()
            passed = (status == expected_status) and (expected_ct_prefix in content_type)
            print(f"[{'PASS' if passed else 'FAIL'}] {path}: status={status}, content_type={content_type}, size={len(data)} bytes")
            if not passed:
                all_passed = False
    except Exception as e:
        print(f"[FAIL] {path}: exception {e}")
        all_passed = False

if not all_passed:
    print("Smoke tests failed!")
    sys.exit(1)
else:
    print("All smoke tests passed successfully!")
    sys.exit(0)

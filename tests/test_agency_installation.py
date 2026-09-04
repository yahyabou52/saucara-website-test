from __future__ import annotations

import subprocess
import sys
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


class InstalledAgencyTests(unittest.TestCase):
    def test_installed_agency_profile_validates(self) -> None:
        result = subprocess.run(
            [sys.executable, "scripts/validate_agency.py"],
            cwd=ROOT,
            text=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            check=False,
        )

        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertIn("profile: installed project", result.stdout)
        self.assertIn("skills: 13", result.stdout)
        self.assertIn("agents: 17", result.stdout)
        self.assertIn("PASS", result.stdout)


if __name__ == "__main__":
    unittest.main()

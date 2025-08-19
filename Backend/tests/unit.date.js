function isValidReleaseAt(dateStr) {
  const d = new Date(dateStr);
  return !isNaN(d.getTime()) && d > new Date();
}

test("valid future date should return true", () => {
  expect(isValidReleaseAt("2999-12-01T00:00:00Z")).toBe(true);
});

test("past date should return false", () => {
  expect(isValidReleaseAt("2000-01-01T00:00:00Z")).toBe(false);
});
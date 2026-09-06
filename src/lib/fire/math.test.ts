import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cholesky, makePositiveDefinite } from "./math.ts";

function reconstruct(L: number[][]): number[][] {
  return L.map((_, i) =>
    L.map((__, j) => L[i]!.reduce((sum, value, k) => sum + value * (L[j]![k] ?? 0), 0)),
  );
}

describe("correlation math", () => {
  it("reconstructs a valid positive-definite correlation matrix", () => {
    const input = [
      [1, 0.3, -0.1],
      [0.3, 1, 0.2],
      [-0.1, 0.2, 1],
    ];
    const matrix = makePositiveDefinite(input);
    const rebuilt = reconstruct(cholesky(matrix));
    assert.deepEqual(matrix, input);

    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix.length; j++) {
        assert.ok(Math.abs(rebuilt[i]![j]! - matrix[i]![j]!) < 1e-10);
      }
    }
  });

  it("repairs a non-positive-definite correlation matrix before simulation", () => {
    const input = [
      [1, 0.9, 0.9],
      [0.9, 1, -0.9],
      [0.9, -0.9, 1],
    ];
    const matrix = makePositiveDefinite(input);
    const rebuilt = reconstruct(cholesky(matrix));

    for (let i = 0; i < matrix.length; i++) {
      assert.ok(Math.abs(matrix[i]![i]! - 1) < 1e-12);
      for (let j = 0; j < matrix.length; j++) {
        assert.ok(Number.isFinite(matrix[i]![j]!));
        assert.ok(Math.abs(matrix[i]![j]! - matrix[j]![i]!) < 1e-12);
        assert.ok(Math.abs(rebuilt[i]![j]! - matrix[i]![j]!) < 1e-10);
      }
    }
  });

  it("resizes and symmetrizes external correlation input", () => {
    const matrix = makePositiveDefinite(
      [
        [1, 0.6],
        [0.2, 1],
      ],
      3,
    );

    assert.equal(matrix.length, 3);
    assert.ok(matrix.every((row) => row.length === 3));
    assert.ok(Math.abs(matrix[0]![1]! - 0.4) < 1e-12);
    assert.ok(Math.abs(matrix[1]![0]! - 0.4) < 1e-12);
    assert.equal(matrix[2]![2], 1);
  });
});

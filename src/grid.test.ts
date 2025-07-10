/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { GridMatrix } from './types';
import createGrid from '.';

// jsdom 에 elementFromPoint 기본 구현이 없으므로, 먼저 빈 함수(vi.fn)로 정의
Object.defineProperty(document, 'elementFromPoint', {
  configurable: true,
  value: vi.fn(),
});

// PointerEvent 폴리필
if (typeof globalThis.PointerEvent === 'undefined') {
  globalThis.PointerEvent = class PointerEvent extends Event {
    pointerId!: number;
    clientX!: number;
    clientY!: number;
    constructor(type: string, init: Partial<PointerEvent>) {
      super(type);
      Object.assign(this, init);
    }
  } as any;
}

// set/releasePointerCapture 폴리필
Element.prototype.setPointerCapture = function (_: number) { /*noop*/ };
Element.prototype.releasePointerCapture = function (_: number) { /*noop*/ };

describe('createGrid (null 없이)', () => {
  let grid: ReturnType<typeof createGrid>;

  // 2×2 매트릭스: a, b, c, d 네 개 아이템
  const initialMatrix: GridMatrix = [
    [
      { id: 'a', x: 0, y: 0 },
      { id: 'b', x: 1, y: 0 },
    ],
    [
      { id: 'c', x: 0, y: 1 },
      { id: 'd', x: 1, y: 1 },
    ],
  ];

  beforeEach(() => {
    grid = createGrid(initialMatrix);
  });

  it('getMatrix()는 초기 매트릭스를 그대로 반환한다', () => {
    expect(grid.getMatrix()).toEqual(initialMatrix);
  });

  it('swapItem()으로 두 아이템 위치가 서로 바뀐다', () => {
    // a ↔ d 교환
    grid.swapItem('a', 'd');
    const m = grid.getMatrix();
    expect(m[0][0].id).toBe('d');
    expect(m[1][1].id).toBe('a');
    // 나머지 위치는 b, c 그대로
    expect(m[0][1].id).toBe('b');
    expect(m[1][0].id).toBe('c');
  });

  it('subscribe() 콜백이 swapItem 때마다 호출된다', () => {
    const fn = vi.fn();
    const unsub = grid.subscribe(fn);

    grid.swapItem('b', 'c');
    expect(fn).toHaveBeenCalledOnce();

    unsub();
    grid.swapItem('a', 'b');
    expect(fn).toHaveBeenCalledOnce(); // 언구독 이후엔 호출되지 않음
  });

  it('attachDnd() 이벤트로 드래그 앤 드롭 시 swapItem 트리거', () => {
    const elA = document.createElement('div');
    elA.dataset.id = 'a';
    const elD = document.createElement('div');
    elD.dataset.id = 'd';
    document.body.append(elA, elD);

    // 항상 elD를 drop 타겟으로 반환
    vi.spyOn(document, 'elementFromPoint').mockReturnValue(elD);

    const cleanup = grid.attachDnd(elA, 'a');

    elA.dispatchEvent(new PointerEvent('pointerdown', { pointerId: 1, clientX: 0, clientY: 0 }));
    elA.dispatchEvent(new PointerEvent('pointerup',   { pointerId: 1, clientX: 0, clientY: 0 }));

    const after = grid.getMatrix();
    expect(after[0][0].id).toBe('d');
    expect(after[1][1].id).toBe('a');

    cleanup();
  });
});

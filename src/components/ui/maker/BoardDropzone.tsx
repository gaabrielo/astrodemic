import { CELL_SIZE } from '@/utils/consts';
import { useDroppable } from '@dnd-kit/core';

export function BoardDropzone({
  id,
  showGrid,
  tileClassName = '',
  row,
  col,
  handleHoverCell,
  handleClickCell,
}: any) {
  const GRID_COLOR = showGrid ? 'rgba(255,255,255, 0.3)' : 'transparent';

  const { setNodeRef, isOver } = useDroppable({
    id,
    data: {
      accepts: ['type1'],
      index: 'droppable',
    },
  });

  if (isOver) {
    tileClassName += ' border border-red-500';
  }

  return (
    <button
      key={`${row}-${col}`}
      ref={setNodeRef}
      style={{
        width: CELL_SIZE,
        height: CELL_SIZE,
        // position: 'absolute',
        // left: col * CELL_SIZE,
        // top: row * CELL_SIZE,
        // zIndex: 999999,
      }}
      className={tileClassName}
      onMouseOver={(e) => handleHoverCell(col, row)}
      onMouseDown={() => handleClickCell(col, row)}
    >
      <div
        className={`w-[16px] h-[16px] mix-blend-difference`}
        style={{
          borderBottom: '1px solid ' + GRID_COLOR,
          borderRight: '1px solid ' + GRID_COLOR,
          borderLeft: col === 0 ? '1px solid ' + GRID_COLOR : '',
          borderTop: row === 0 ? '1px solid ' + GRID_COLOR : '',
        }}
      />
    </button>
  );
}

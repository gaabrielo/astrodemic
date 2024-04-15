import { PlusIcon } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

export function Level({
  setDimensions,
  dimensions,
  levelImgScale,
  selectedPlacement,
  showGrid,
  boardSize,
  setNewTiles,
}: any) {
  const [placements, setPlacements] = useState<{ [key: string]: number }>({});
  const [isClicking, setIsClicking] = useState(false);
  console.log('🚀 ~ isClicking:', isClicking);

  const PIXEL_SIZE = 16;
  const GRID_COLOR = showGrid ? 'rgba(255,255,255, 0.3)' : 'transparent';
  // const levelImgRef = useRef(null);

  // useEffect(() => {
  //   if (levelImgRef.current) {
  //     const { naturalWidth, naturalHeight } = levelImgRef.current;
  //     setDimensions({ width: naturalWidth, height: naturalHeight });
  //   }
  // }, [levelImgRef]);

  const cellRef = useRef(null);

  function handleAddTiles(e: any) {
    const position = e.currentTarget.name;
    setNewTiles(position);
  }

  function getBoardXY(ls: any) {
    const w = ls[0] * PIXEL_SIZE;
    const h = ls[1] * PIXEL_SIZE;

    return { width: w, height: h };
  }

  function handleClickCell(col: number, row: number) {
    if (selectedPlacement === 0) addCollisionIdentifier(col, row);
  }

  function handleHoverCell(col: number, row: number) {
    if (isClicking) {
      handleClickCell(col, row);
    }
  }

  useEffect(() => {
    window.addEventListener('mousedown', () => setIsClicking(true));
    window.addEventListener('mouseup', () => setIsClicking(false));

    return () => {
      window.removeEventListener('mousedown', () => setIsClicking(false));
      window.addEventListener('mouseup', () => setIsClicking(false));
    };
  }, []); // no dependencies

  function addCollisionIdentifier(col: number, row: number) {
    setPlacements((prev) => {
      if (!Object.keys(prev).some((p) => p === `${row}x${col}`)) {
        return {
          ...prev,
          [row + 'x' + col]: selectedPlacement,
        };
      }

      const prevCopy = { ...prev };
      delete prevCopy[`${row}x${col}`];
      return prevCopy;
    });
  }

  const { width, height } = useMemo(() => getBoardXY(boardSize), [boardSize]);

  return (
    <div className="flex flex-col text-center">
      <button
        className="flex-1 flex justify-center hover:bg-slate-200 transition-colors group py-[1px] mx-auto"
        style={{ width: width + 4 + 'px' }}
        name="top"
        onClick={handleAddTiles}
      >
        <PlusIcon className="w-[6px] h-[6px] group-hover:text-slate-500 text-slate-200 transition-colors mt-[2px]" />
      </button>

      <div className="flex">
        <button
          className="flex-1 flex items-center hover:bg-slate-200 transition-colors group px-[1px]"
          name="left"
          onClick={(e) => handleAddTiles(e)}
        >
          <PlusIcon className="w-[6px] h-[6px] group-hover:text-slate-500 text-slate-200 transition-colors ml-[2px]" />
        </button>

        <main className="bg-slate-200 p-0.5">
          <div
            style={{
              height: height + 'px',
              width: width + 'px',
            }}
            className="relative"
          >
            <div className="flex flex-col absolute">
              {[...Array(boardSize[1])].map((_, row) => (
                <div className="flex" key={row}>
                  {[...Array(boardSize[0])].map((_, col) => {
                    let tileClassName =
                      'hover:bg-cyan-900/50 w-[16px] h-[16px] mix-blend-difference';

                    // collision cell background style
                    if (placements[row + 'x' + col] == 0) {
                      tileClassName += ' bg-cyan-900/90';
                    }

                    return (
                      <button
                        key={`${row}-${col}`}
                        style={{
                          width: PIXEL_SIZE,
                          height: PIXEL_SIZE,
                          borderBottom: '1px solid ' + GRID_COLOR,
                          borderRight: '1px solid ' + GRID_COLOR,
                          borderLeft:
                            col === 0 ? '1px solid ' + GRID_COLOR : '',
                          borderTop: row === 0 ? '1px solid ' + GRID_COLOR : '',
                        }}
                        className={tileClassName}
                        onMouseOver={(e) => handleHoverCell(col, row)}
                        ref={cellRef}
                        onMouseDown={() => handleClickCell(col, row)}
                      />
                    );
                  })}
                </div>
              ))}
            </div>

            {/* <Tiles /> */}
            <img src="/levels/dorm.png" />
          </div>
        </main>

        <button
          className="flex-1 flex items-center hover:bg-slate-200 transition-colors group px-[1px]"
          name="right"
          onClick={(e) => handleAddTiles(e)}
        >
          <PlusIcon className="w-[6px] h-[6px] group-hover:text-slate-500 text-slate-200 transition-colors mr-[2px]" />
        </button>
      </div>

      <button
        className="flex justify-center hover:bg-slate-200 transition-colors group py-[1px] mx-auto"
        style={{ width: width + 4 + 'px' }}
        name="bottom"
        onClick={(e) => handleAddTiles(e)}
      >
        <PlusIcon className="w-[6px] h-[6px] group-hover:text-slate-500 text-slate-200 transition-colors mb-[2px]" />
      </button>
    </div>
  );
}

function highlightArea() {}

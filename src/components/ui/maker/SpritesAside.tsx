import { Layers } from './Layers';
import { SelectableSprite } from '@/components/ui/maker/SelectableSprite';
import { Button } from '@/components/ui/primitives/Button';
import { Input } from '@/components/ui/primitives/Input';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/primitives/Resizable';
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/components/ui/primitives/toggle-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/utils/helpers';
import { MAKER_SELECTABLE_TILES } from '@/utils/tiles';
import { PlusIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function SpritesAside({ className, ...rest }: any) {
  const asideRef = useRef<any>(null);
  const [asideWidth, setAsideWidth] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (asideRef.current) {
      // const wDiv = asideRef?.current.offsetWidth;
      // setAsideWidth(wDiv ?? 0);

      const resizeObserver = new ResizeObserver(() => {
        if (asideRef.current.offsetWidth !== asideWidth) {
          setAsideWidth(asideRef.current.offsetWidth);
        }
        // if (asideRef.current.offsetHeight !== height) {
        //   setHeight(asideRef.current.offsetHeight);
        // }
      });

      resizeObserver.observe(asideRef.current);

      return function cleanup() {
        resizeObserver.disconnect();
      };
    }
  }, [asideRef]);

  return (
    <aside
      {...rest}
      className={cn(
        'w-full h-full z-10 relative flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-200 hover:scrollbar-thumb-neutral-300 scrollbar-track-transparent',
        className
      )}
      ref={asideRef}
    >
      {/* <div className="absolute w-full h-[104px] top-0 right-0 z-10 bg-red-500">
        <div className="sticky top-4 left-0 w-full bg-gray-600 z-30"></div>
        
      </div> */}

      {/* <Tabs defaultValue="sprites" className="w-full pb-3">
        <div className="px-3 py-3 bg-white top-0 sticky z-20">
          <TabsList className="grid grid-cols-2 h-fit">
            <TabsTrigger value="sprites" className="text-xs py-2">
              Sprites
            </TabsTrigger>
            <TabsTrigger value="layers" className="text-xs py-2">
              Camadas
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="sprites" className="bg-white m-0 px-3">
          <div className="flex gap-2 items-center sticky z-20 top-[64px] w-full">
            <Input
              placeholder={`Busque ${
                Object.keys(MAKER_SELECTABLE_TILES).length
              } sprites...`}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div
            className={cn(
              'grid grid-cols-2 gap-1 mt-2 z-0',
              asideWidth >= 320 && 'grid-cols-4',
              asideWidth >= 440 && 'grid-cols-5',
              asideWidth >= 540 && 'grid-cols-6'
            )}
          >
            {Object.keys(MAKER_SELECTABLE_TILES)
              .filter((spt: string) => {
                if (searchTerm.trim() === '') return true;

                if (
                  MAKER_SELECTABLE_TILES[spt]?.keywords?.includes(
                    searchTerm.trim().toLowerCase()
                  ) ||
                  spt
                    .replaceAll('_', ' ')
                    .toLowerCase()
                    .includes(searchTerm.trim().toLowerCase())
                ) {
                  return true;
                }
              })
              .map((spt: string) => {
                return (
                  <SelectableSprite
                    spriteSettings={MAKER_SELECTABLE_TILES[spt]}
                    spriteKey={spt}
                    key={spt}
                  />
                );
              })}
          </div>
        </TabsContent>
        <TabsContent value="layers" className="bg-white m-0">
          <Layers />
        </TabsContent>
      </Tabs> */}

      {/* <div>
        <ToggleGroup
          type="multiple"
          variant="outline"
          className="justify-start overflow-auto"
        >
          <ToggleGroupItem value="floor">Floor</ToggleGroupItem>
          <ToggleGroupItem value="wall">Wall</ToggleGroupItem>
          <ToggleGroupItem value="wall">Collectible</ToggleGroupItem>
          <ToggleGroupItem value="wall">Decoration</ToggleGroupItem>
        </ToggleGroup>
      </div> */}

      <div className="flex gap-2 items-center sticky z-20 pt-3 top-0 w-full px-3 bg-white">
        <Input
          placeholder={`Busque ${
            Object.keys(MAKER_SELECTABLE_TILES).length
          } sprites...`}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* <Button className="flex items-center">
          <PlusIcon className="w-4 h-4 mr-2" />
          Add
        </Button> */}
      </div>

      <div
        className={cn(
          'grid grid-cols-2 gap-1 mt-3.5 mb-3 z-0 mx-3',
          asideWidth >= 320 && 'grid-cols-4',
          asideWidth >= 440 && 'grid-cols-5',
          asideWidth >= 540 && 'grid-cols-6'
        )}
      >
        {/* <Sprite frameCoordinate={TILES.ROGUE_RUN_1_LEFT} /> */}
        {Object.keys(MAKER_SELECTABLE_TILES)
          .filter((spt: string) => {
            if (searchTerm.trim() === '') return true;

            if (
              MAKER_SELECTABLE_TILES[spt]?.keywords?.includes(
                searchTerm.trim().toLowerCase()
              ) ||
              spt
                .replaceAll('_', ' ')
                .toLowerCase()
                .includes(searchTerm.trim().toLowerCase())
            ) {
              return true;
            }
          })
          .map((spt: string) => {
            return (
              <SelectableSprite
                spriteSettings={MAKER_SELECTABLE_TILES[spt]}
                spriteKey={spt}
                key={spt}
              />
            );
          })}
      </div>
    </aside>
  );
}

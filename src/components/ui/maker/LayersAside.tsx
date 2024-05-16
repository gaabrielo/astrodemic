import { useState } from 'react';
import { EditableTextContainer } from '@/components/ui/shared/EditableTextContainer';
import { SortableList } from '@/components/ui/shared/sortable-list';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/primitives/tooltip';
import { Button } from '@/components/ui/primitives/Button';
import { EyeIcon, PlusIcon } from 'lucide-react';

interface LayerProps {
  id: number;
  name?: string;
  hidden?: boolean;
}

export function LayersAside() {
  const [items, setItems] = useState<LayerProps[]>(
    createRange(1, (index) => ({ id: index + 1 }))
  );
  const [maxLayers, setMaxLayers] = useState(1);
  const [selectedLayer, setSelectedLayer] = useState(items[0]?.id ?? null);

  function handleLayerRename(layerId: number, name: string) {
    const layersWithRenamedItem = [...items].map((obj) =>
      obj.id == layerId ? { ...obj, name } : obj
    );

    setItems(layersWithRenamedItem);
  }

  function handleNewLayer() {
    setItems((prev: any) => {
      const newItems = [...prev];

      newItems.unshift({
        id: maxLayers + 1,
      });

      return newItems;
    });
    setSelectedLayer(maxLayers + 1);
    setMaxLayers((prev) => prev + 1);
  }

  function handleLayerVisibility(layerId: number, status: boolean) {
    setItems((prev: any) => {
      const newItems = [...prev].map((obj) =>
        obj.id == layerId ? { ...obj, hidden: status } : obj
      );

      return newItems;
    });
  }

  function handleLayerDeletion(e: any, layerId: number) {
    e.stopPropagation();
    // if (items.length === 1) return;

    if (selectedLayer === layerId) setSelectedLayer(items[0].id ?? null);

    setItems((prev: any) => prev.filter((obj: any) => obj.id !== layerId));
  }

  function handleSelectLayer(layerId: number) {
    setSelectedLayer(layerId);
  }

  return (
    <div
      className="w-full h-screen flex flex-col gap-3.5 overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded-full
    scrollbar-thumb-neutral-200 hover:scrollbar-thumb-neutral-300 scrollbar-track-transparent"
    >
      <div className="px-3 pt-3.5 bg-white sticky top-0 z-40">
        <Button
          className="font-normal w-full text-slate-600 gap-2"
          variant={'outline'}
          onClick={handleNewLayer}
        >
          <PlusIcon className="h-4 w-4 text-slate-600 mb-0.5" />
          Nova camada
        </Button>
      </div>

      <div className="px-3 pb-3">
        <SortableList
          items={items}
          onChange={setItems}
          renderItem={(item) => (
            <SortableList.Item
              id={item.id}
              className={`group bg-background z-30 ${
                item.id == selectedLayer ? 'bg-accent z-20' : ''
              }`}
              onClick={() => handleSelectLayer(item.id)}
            >
              <div
                className="flex items-center text-sm text-slate-600 group-hover:text-slate-900 
                transition-all overflow-ellipsis overflow-hidden whitespace-nowrap w-full"
              >
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() =>
                    handleLayerVisibility(
                      item.id,
                      !items.find((obj) => obj.id === item.id)?.hidden
                    )
                  }
                  className={`max-w-fit px-1 ${
                    item.id == selectedLayer &&
                    'text-slate-950 hover:brightness-95'
                  }`}
                >
                  {item?.hidden ? (
                    <EyeOffIcon />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                </Button>

                <EditableTextContainer
                  value={item?.name ?? `Camada ${item.id}`}
                  onChange={(e: any) =>
                    handleLayerRename(item.id, e.target.value)
                  }
                  doubleClick
                  labelStyles={`transition-all ${
                    item.id == selectedLayer && 'text-slate-950'
                  } ${item?.hidden && 'opacity-60 line-through'}`}
                  singleClick={() => handleSelectLayer(item.id)}
                >
                  {item?.name ?? `Camada ${item.id}`}
                </EditableTextContainer>
              </div>

              <SortableList.DeleteHandle
                className={`hidden group-hover:flex max-w-fit px-1 mr-0 ml-auto ${
                  item.id == selectedLayer ? 'hover:brightness-95' : ''
                }`}
                onClick={(e: any) => handleLayerDeletion(e, item.id)}
              />
              <SortableList.DragHandle
                className={`hidden group-hover:flex max-w-fit px-1 ${
                  item.id == selectedLayer ? 'hover:brightness-95' : ''
                }`}
              />
            </SortableList.Item>
          )}
        />
      </div>
    </div>
  );
}

export function createRange<T>(
  length: number,
  initializer: (index: number) => T
): T[] {
  return [...new Array(length)].map((_, index) => initializer(index));
}

function EyeOffIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="#000000"
      viewBox="0 0 256 256"
      className="opacity-60"
    >
      <path d="M228,175a8,8,0,0,1-10.92-3l-19-33.2A123.23,123.23,0,0,1,162,155.46l5.87,35.22a8,8,0,0,1-6.58,9.21A8.4,8.4,0,0,1,160,200a8,8,0,0,1-7.88-6.69l-5.77-34.58a133.06,133.06,0,0,1-36.68,0l-5.77,34.58A8,8,0,0,1,96,200a8.4,8.4,0,0,1-1.32-.11,8,8,0,0,1-6.58-9.21L94,155.46a123.23,123.23,0,0,1-36.06-16.69L39,172A8,8,0,1,1,25.06,164l20-35a153.47,153.47,0,0,1-19.3-20A8,8,0,1,1,38.22,99c16.6,20.54,45.64,45,89.78,45s73.18-24.49,89.78-45A8,8,0,1,1,230.22,109a153.47,153.47,0,0,1-19.3,20l20,35A8,8,0,0,1,228,175Z"></path>
    </svg>
  );
}

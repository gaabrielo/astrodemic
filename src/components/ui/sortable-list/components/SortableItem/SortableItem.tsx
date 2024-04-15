import React, { createContext, useContext, useMemo } from 'react';
import type { CSSProperties, PropsWithChildren } from 'react';
import type {
  DraggableSyntheticListeners,
  UniqueIdentifier,
} from '@dnd-kit/core';
import { defaultAnimateLayoutChanges, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/utils/helpers';
import { Button } from '@/components/ui/primitives/Button';
import { GripVerticalIcon, TrashIcon } from 'lucide-react';

interface Props {
  id: UniqueIdentifier;
  className?: any;
  onClick?: any;
}

interface Context {
  attributes: Record<string, any>;
  listeners: DraggableSyntheticListeners;
  ref(node: HTMLElement | null): void;
}

const SortableItemContext = createContext<Context>({
  attributes: {},
  listeners: undefined,
  ref() {},
});

function animateLayoutChanges(args: any) {
  const { isSorting, wasSorting } = args;

  if (isSorting || wasSorting) {
    return defaultAnimateLayoutChanges(args);
  }

  return true;
}

export function SortableItem({
  children,
  id,
  className,
  onClick = () => {},
}: PropsWithChildren<Props>) {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ animateLayoutChanges, id });

  const context = useMemo(
    () => ({
      attributes,
      listeners,
      ref: setActivatorNodeRef,
    }),
    [attributes, listeners, setActivatorNodeRef]
  );
  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <SortableItemContext.Provider value={context}>
      <li
        ref={setNodeRef}
        style={style}
        onClick={onClick}
        className={cn('SortableItem', className)}
      >
        {children}
      </li>
    </SortableItemContext.Provider>
  );
}

export function DragHandle({ className }: any) {
  const { attributes, listeners, ref } = useContext(SortableItemContext);

  return (
    <Button
      variant={'ghost'}
      size={'icon'}
      className={cn('cursor-grab fill-[#919eab]', className)}
      {...attributes}
      {...listeners}
      ref={ref}
    >
      <GripVerticalIcon className="w-4 h-4" color="#919eab" />
    </Button>
  );
}

export function DeleteHandle({ className, ...props }: any) {
  // const { attributes, listeners, ref } = useContext(SortableItemContext);

  return (
    <Button
      variant={'ghost'}
      size={'icon'}
      className={cn(
        'hover:text-red-600 focus:text-red-600 focus:bg-red-200 text-[#919eab] transition-colors',
        className
      )}
      {...props}
      // ref={ref}
    >
      <TrashIcon className="h-4 w-4" />
    </Button>
  );
}

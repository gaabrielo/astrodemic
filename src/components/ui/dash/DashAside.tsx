'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/primitives/Input';
import { Separator } from '@/components/ui/primitives/Separator';
import { Avatar, AvatarFallback } from '@/components/ui/primitives/avatar';
import { SmoothTabs } from '@/components/ui/shared/SmoothTabs';
import { dashTabs } from '@/utils/consts';
import { ArrowRightIcon, ArrowUpRightIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export function DashAside({
  onSelectTab = () => {},
  justTabs = false,
  defaultSelected = null,
}: any) {
  const [selectedTabIndex, setSelectedTabIndex] = useState(
    typeof defaultSelected === 'number' ? defaultSelected : 0
  );

  const router = useRouter();

  const tabs = dashTabs;

  useEffect(() => {
    if (router?.query.tab) {
      const newTabIndex = Object.keys(tabs).indexOf(router?.query.tab);
      setSelectedTabIndex(newTabIndex);
    }
  }, [router.query]);

  if (justTabs) {
    return (
      <>
        <div className="flex items-center mt-2 mx-2">
          <Avatar>
            <AvatarFallback>G</AvatarFallback>
          </Avatar>

          <div className="flex flex-col ml-2 text-sm overflow-ellipsis overflow-hidden whitespace-nowrap ">
            <p className="text-slate-900 overflow-ellipsis overflow-hidden">
              gabrieldmendonca2@gmail.com
            </p>
            <p className="text-neutral-500 overflow-ellipsis overflow-hidden">
              @gabirola
            </p>
          </div>
        </div>

        <Separator className="mt-3 mb-4" />
        <div className="px-2 pb-2">
          <p className="mb-2 text-sm text-neutral-500">DASH</p>

          <SmoothTabs
            orientation="vertical"
            selected={selectedTabIndex}
            tabs={Object.keys(tabs).map((k: any, tKey: number) => (
              <Link
                href={tabs[k]?.url ? tabs[k].url : `/dash/${k}`}
                key={k}
                name={k}
                onClick={(e) => {
                  setSelectedTabIndex(tKey);
                  onSelectTab({ ...tabs[k], id: k });
                }}
                className="text-left flex items-center gap-1"
              >
                {tabs[k].label}

                {/* {(k === 'journey' || k === 'maker') && (
                  <span className="text-xs bg-slate-700 rounded-md text-white px-2 leading-4 mb-0.5">
                    Maker
                  </span>
                )} */}
              </Link>
            ))}
          />

          <div className="flex items-center mt-8 mb-2 gap-1">
            <p className="text-sm text-neutral-500 leading-none">
              NOTIFICAÇÕES
            </p>
            <span className="text-xs bg-slate-700 rounded-md text-white px-2 leading-4 mb-0.5">
              0
            </span>
          </div>
          <p className="text-sm text-neutral-500/60 w-full text-center">
            Nada para ver ainda.
          </p>
        </div>
      </>
    );
  }

  return (
    <aside className="flex flex-col w-1/4 h-screen p-3 sticky top-0">
      <div className="flex items-center">
        <Avatar>
          <AvatarFallback>G</AvatarFallback>
        </Avatar>

        <div className="flex flex-col ml-2 text-sm overflow-ellipsis overflow-hidden whitespace-nowrap ">
          <p className="text-slate-900 overflow-ellipsis overflow-hidden">
            gabrieldmendonca2@gmail.com
          </p>
          <p className="text-neutral-500 overflow-ellipsis overflow-hidden text-xs">
            @gabirola
          </p>
        </div>
      </div>

      <Separator className="mt-3 mb-8" />

      <p className="mb-2 text-sm text-neutral-500">DASH</p>

      <SmoothTabs
        orientation="vertical"
        selected={selectedTabIndex}
        tabs={Object.keys(tabs)
          // .filter((k) => k !== 'journey' && k !== 'maker')
          .map((k: any, tKey: number) => (
            <Link
              href={tabs[k]?.url ? tabs[k].url : `/dash/${k}`}
              key={k}
              name={k}
              onClick={(e) => {
                setSelectedTabIndex(tKey);
                onSelectTab({ ...tabs[k], id: k });
              }}
              className="text-left flex items-center gap-1"
            >
              {tabs[k].label.split(`\n`).map((t) => (
                <>
                  {t}
                  {tabs[k].label.split(`\n`).length > 1 && <br />}
                </>
              ))}

              {/* {(k === 'journey' || k === 'maker') && (
                <span className="text-xs bg-slate-700 rounded-md text-white px-2 leading-4 mb-0.5">
                  Maker
                </span>
              )} */}
            </Link>
          ))}
      />

      <p className="mt-8 mb-2 text-sm text-neutral-500 leading-none">
        ACESSAR MAPA
      </p>

      <div className="flex gap-1 w-full">
        <Input
          type="text"
          placeholder="Código de acesso"
          className="focus:ring-0 ring-0 ring-offset-0 focus:ring-offset-0"
        />
        <Button className="w-1/6 h-10" size="icon" variant="secondary">
          <ArrowRightIcon className="w-4 h-4 text-neutral-800" />
        </Button>
      </div>

      <div className="flex items-center mt-8 mb-2 gap-1">
        <p className="text-sm text-neutral-500 leading-none">NOTIFICAÇÕES</p>
        <span className="text-xs bg-slate-700 rounded-md text-white px-2 leading-4 mb-0.5">
          0
        </span>
      </div>
      <p className="text-sm text-neutral-500/60 w-full text-center">
        Nada para ver ainda.
      </p>
    </aside>
  );
}

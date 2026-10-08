'use client';

import { motion } from 'framer-motion';
import { APPS } from '@/lib/apps';
import { DOCK_IDS, HomeIcon } from '@/components/ios/HomeScreen';

const dockApps = DOCK_IDS.map((id) => APPS.find((a) => a.id === id)!);

/** iOS dock: four favourite apps on a frosted shelf, plus the home indicator. */
export function IOSDock({ booted }: { booted: boolean }) {
  return (
    <div className="sm:hidden">
      <motion.nav
        aria-label="Dock"
        initial={{ y: 40, opacity: 0 }}
        animate={booted ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 26, delay: 0.1 }}
        className="mac-glass fixed inset-x-3 bottom-[22px] z-[15] flex h-[86px] items-center justify-around rounded-[30px] px-2"
      >
        {dockApps.map((app, i) => (
          <HomeIcon
            key={app.id}
            id={app.id}
            title={app.title}
            appIcon={app.appIcon}
            jiggle={false}
            index={i}
            onLongPress={() => {}}
            showLabel={false}
            size={58}
          />
        ))}
      </motion.nav>
      <div aria-hidden="true" className="fixed bottom-[7px] left-1/2 z-[15] h-[5px] w-[134px] -translate-x-1/2 rounded-full bg-white/85" />
    </div>
  );
}

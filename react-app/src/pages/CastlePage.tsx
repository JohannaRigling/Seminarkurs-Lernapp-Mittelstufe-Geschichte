import React, { useState } from 'react';
import { Castle, Lock, Check, Coins, Sparkles, ShoppingCart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToastContext } from '../contexts/ToastContext';
import { Card, CardContent, Button, Modal, ProgressBar } from '../components/common';
import type { CastleUpgrade } from '../types';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../config/firebase';

const castleUpgrades: CastleUpgrade[] = [
  {
    id: 'wallLeft',
    name: 'Linke Mauer',
    cost: 50,
    description: 'Verstärke die linke Seite deiner Burg',
    image: '🧱',
  },
  {
    id: 'wallRight',
    name: 'Rechte Mauer',
    cost: 50,
    description: 'Verstärke die rechte Seite deiner Burg',
    image: '🧱',
  },
  {
    id: 'towerLeft',
    name: 'Linker Turm',
    cost: 100,
    description: 'Ein Wachturm zur Verteidigung',
    image: '🗼',
  },
  {
    id: 'towerRight',
    name: 'Rechter Turm',
    cost: 100,
    description: 'Ein weiterer Wachturm',
    image: '🗼',
  },
  {
    id: 'bergfried',
    name: 'Bergfried',
    cost: 200,
    description: 'Der Hauptturm deiner Burg',
    image: '🏰',
  },
  {
    id: 'flag',
    name: 'Flagge',
    cost: 150,
    description: 'Zeige dein Banner stolz!',
    image: '🚩',
  },
];

const CastlePage: React.FC = () => {
  const { userData, currentUser, updateProgress, addCoins } = useAuth();
  const toast = useToastContext();
  const [showShop, setShowShop] = useState(false);

  if (!userData) return null;

  const { progress } = userData;
  const ownedParts = Object.entries(progress.castleParts).filter(([_, owned]) => owned).length;
  const totalParts = castleUpgrades.length;

  const handlePurchase = async (upgrade: CastleUpgrade) => {
    if (!currentUser) return;

    if (progress.coins < upgrade.cost) {
      toast.error('Nicht genug Münzen!');
      return;
    }

    if (progress.castleParts[upgrade.id]) {
      toast.warning('Du besitzt dieses Teil bereits!');
      return;
    }

    // Deduct coins and add castle part
    await addCoins(-upgrade.cost);

    const newCastleParts = {
      ...progress.castleParts,
      [upgrade.id]: true,
    };

    const newCastleLevel = Object.values(newCastleParts).filter(Boolean).length;

    await updateProgress({
      castleParts: newCastleParts,
      castleLevel: newCastleLevel,
    });

    // Add activity
    await updateDoc(doc(db, 'users', currentUser.uid), {
      activities: arrayUnion({
        id: crypto.randomUUID(),
        type: 'purchase',
        description: `"${upgrade.name}" für die Burg gekauft`,
        timestamp: new Date().toISOString(),
        coins: -upgrade.cost,
      }),
    });

    toast.success(`${upgrade.name} gekauft! 🏰`);

    // Check for complete castle
    if (newCastleLevel === totalParts) {
      toast.success('🎉 Deine Burg ist vollständig! Du bist ein wahrer Burgherr!');
    }
  };

  const renderCastle = () => {
    const parts = progress.castleParts;

    return (
      <div className="relative w-full max-w-md mx-auto aspect-square">
        {/* Base/Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-amber-900 to-amber-700 rounded-b-lg" />

        {/* Castle Structure */}
        <div className="absolute inset-0 flex items-end justify-center pb-8">
          <div className="relative">
            {/* Left Wall */}
            <div className={`
              absolute -left-20 bottom-0 w-16 h-24
              ${parts.wallLeft ? 'bg-gradient-to-t from-stone-700 to-stone-500' : 'bg-stone-800/30 border-2 border-dashed border-stone-600'}
              rounded-t-lg transition-all duration-500
            `}>
              {parts.wallLeft && (
                <div className="absolute top-0 left-0 right-0 h-4 flex justify-around">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-3 h-4 bg-stone-600" />
                  ))}
                </div>
              )}
            </div>

            {/* Left Tower */}
            <div className={`
              absolute -left-24 bottom-24 w-12 h-32
              ${parts.towerLeft ? 'bg-gradient-to-t from-stone-600 to-stone-400' : 'bg-stone-800/30 border-2 border-dashed border-stone-600'}
              rounded-t-full transition-all duration-500
            `}>
              {parts.towerLeft && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-6 bg-red-700 rounded-t-full" />
              )}
            </div>

            {/* Main Keep (Bergfried) */}
            <div className={`
              relative w-32 h-48
              ${parts.bergfried ? 'bg-gradient-to-t from-stone-700 to-stone-500' : 'bg-stone-800/30 border-2 border-dashed border-stone-600'}
              rounded-t-lg transition-all duration-500
            `}>
              {parts.bergfried && (
                <>
                  {/* Battlements */}
                  <div className="absolute top-0 left-0 right-0 h-6 flex justify-around">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-4 h-6 bg-stone-600" />
                    ))}
                  </div>
                  {/* Window */}
                  <div className="absolute top-16 left-1/2 -translate-x-1/2 w-8 h-12 bg-stone-900 rounded-t-full" />
                  {/* Door */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-16 bg-amber-900 rounded-t-lg" />
                </>
              )}

              {/* Flag */}
              {parts.flag && (
                <div className="absolute -top-16 left-1/2 -translate-x-1/2">
                  <div className="w-1 h-20 bg-stone-400" />
                  <div className="absolute top-2 left-1 w-12 h-8 bg-[var(--color-secondary)] animate-pulse-custom"
                    style={{ clipPath: 'polygon(0 0, 100% 25%, 100% 75%, 0 100%)' }}
                  />
                </div>
              )}
            </div>

            {/* Right Wall */}
            <div className={`
              absolute -right-20 bottom-0 w-16 h-24
              ${parts.wallRight ? 'bg-gradient-to-t from-stone-700 to-stone-500' : 'bg-stone-800/30 border-2 border-dashed border-stone-600'}
              rounded-t-lg transition-all duration-500
            `}>
              {parts.wallRight && (
                <div className="absolute top-0 left-0 right-0 h-4 flex justify-around">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-3 h-4 bg-stone-600" />
                  ))}
                </div>
              )}
            </div>

            {/* Right Tower */}
            <div className={`
              absolute -right-24 bottom-24 w-12 h-32
              ${parts.towerRight ? 'bg-gradient-to-t from-stone-600 to-stone-400' : 'bg-stone-800/30 border-2 border-dashed border-stone-600'}
              rounded-t-full transition-all duration-500
            `}>
              {parts.towerRight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-6 bg-red-700 rounded-t-full" />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Castle className="w-8 h-8 text-[var(--color-secondary)]" />
          Meine Burg
        </h1>
        <p className="text-[var(--color-text-muted)] mt-2">
          Baue deine Burg aus und zeige deinen Fortschritt!
        </p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <Coins className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
            <p className="text-2xl font-bold">{progress.coins}</p>
            <p className="text-sm text-[var(--color-text-muted)]">Münzen</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Castle className="w-6 h-6 mx-auto mb-2 text-[var(--color-secondary)]" />
            <p className="text-2xl font-bold">{ownedParts}/{totalParts}</p>
            <p className="text-sm text-[var(--color-text-muted)]">Teile</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Sparkles className="w-6 h-6 mx-auto mb-2 text-purple-500" />
            <p className="text-2xl font-bold">{progress.xp}</p>
            <p className="text-sm text-[var(--color-text-muted)]">XP</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl mb-2">👑</div>
            <p className="text-lg font-bold">{progress.rank}</p>
            <p className="text-sm text-[var(--color-text-muted)]">Rang</p>
          </CardContent>
        </Card>
      </div>

      {/* Castle Display */}
      <Card glow className="mb-6">
        <CardContent className="py-8">
          {renderCastle()}
          <div className="mt-8">
            <ProgressBar
              value={ownedParts}
              max={totalParts}
              label="Burgfortschritt"
              color="gold"
            />
          </div>
        </CardContent>
      </Card>

      {/* Shop Button */}
      <Button
        onClick={() => setShowShop(true)}
        className="w-full"
        leftIcon={<ShoppingCart className="w-5 h-5" />}
      >
        Burg-Shop öffnen
      </Button>

      {/* Shop Modal */}
      <Modal
        isOpen={showShop}
        onClose={() => setShowShop(false)}
        title="Burg-Shop"
        size="lg"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-[var(--color-surface-light)] rounded-lg">
            <span>Deine Münzen:</span>
            <span className="flex items-center gap-2 font-bold text-yellow-500">
              <span className="text-xl">🐄</span>
              {progress.coins}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {castleUpgrades.map((upgrade) => {
              const isOwned = progress.castleParts[upgrade.id];
              const canAfford = progress.coins >= upgrade.cost;

              return (
                <Card
                  key={upgrade.id}
                  className={`
                    ${isOwned ? 'opacity-60' : ''}
                    ${!isOwned && canAfford ? 'hover:border-[var(--color-secondary)]' : ''}
                  `}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{upgrade.image}</div>
                      <div className="flex-1">
                        <h3 className="font-bold flex items-center gap-2">
                          {upgrade.name}
                          {isOwned && <Check className="w-4 h-4 text-green-500" />}
                        </h3>
                        <p className="text-sm text-[var(--color-text-muted)]">
                          {upgrade.description}
                        </p>
                        <div className="flex items-center justify-between mt-3">
                          <span className={`
                            flex items-center gap-1 font-bold
                            ${canAfford ? 'text-yellow-500' : 'text-red-400'}
                          `}>
                            🐄 {upgrade.cost}
                          </span>
                          {isOwned ? (
                            <span className="text-green-500 text-sm font-medium">
                              Gekauft
                            </span>
                          ) : (
                            <Button
                              size="sm"
                              disabled={!canAfford}
                              onClick={() => handlePurchase(upgrade)}
                            >
                              {canAfford ? 'Kaufen' : <Lock className="w-4 h-4" />}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CastlePage;

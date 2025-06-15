
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useUser } from '@/context/UserContext';
import { Link } from 'react-router-dom';

const PromoPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      const hasSeenPromo = localStorage.getItem('promoPopupSeen_FENQRO20');
      const promoEndDate = new Date('2025-09-20');

      if (!hasSeenPromo && new Date() < promoEndDate) {
        setIsOpen(true);
      }
    }
  }, [user]);

  const handleClose = () => {
    localStorage.setItem('promoPopupSeen_FENQRO20', 'true');
    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>🎉 Special Offer Just For You! 🎉</DialogTitle>
          <DialogDescription>
            Get <strong>3 months of Pro or Ultra for FREE!</strong>
            Take full control of your finances with our premium features, on us.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 text-center">
            <p className="text-sm text-gray-500 mb-2">Use this coupon code on the subscription page:</p>
            <div className="inline-block bg-jade-100 text-jade-800 font-mono text-lg py-2 px-4 rounded-md border border-dashed border-jade-300">
                FENQRO20
            </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>Maybe Later</Button>
          <Button asChild onClick={handleClose}>
            <Link to="/subscription">Go to Plans</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PromoPopup;

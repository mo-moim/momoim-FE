export interface GatheringContent {
  id?: number;
  managerId?: number;
  managerName?: string;
  managerProfileImage?: string;
  category?: string;
  subCategory?: string;
  name?: string;
  gatheringType?: string;
  status?: string;
  image?: string;
  description?: string;
  address?: string;
  tags?: string[];
  location?: string;
  capacity?: number;
  participantCount?: number;
  isPeriodic?: boolean;
  nextGatheringAt?: string;
}

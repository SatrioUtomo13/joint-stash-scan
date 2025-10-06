import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users, Crown } from "lucide-react";

interface GroupMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "admin" | "member";
  totalContributed: number;
  lastActivity: string;
}

const mockMembers: GroupMember[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    totalContributed: 15000000,
    lastActivity: "2024-01-15",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "member",
    totalContributed: 12500000,
    lastActivity: "2024-01-14",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "member",
    totalContributed: 10000000,
    lastActivity: "2024-01-13",
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    role: "member",
    totalContributed: 7500000,
    lastActivity: "2024-01-12",
  },
];

export const GroupMembers = ({ members }: { members: any[] }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      notation: "compact",
    }).format(amount);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Group Members
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {members.map((member, index) => (
            <div
              key={member.id}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/30 transition-all duration-300 hover-scale animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Avatar className="h-10 w-10 transition-transform duration-300 hover:scale-110">
                <AvatarImage src={member.avatar} alt={member.username} />
                <AvatarFallback className="bg-primary/10 text-primary font-medium">
                  {getInitials(member.username)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-sm truncate">
                    {member.username}
                  </p>
                  {member.role === "admin" && (
                    <Crown className="w-3 h-3 text-warning" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  {member.email}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge
                    variant={member.role === "admin" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {member.role}
                  </Badge>
                  <span className="text-xs text-accent font-medium">
                    {formatCurrency(member.total_contributed)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

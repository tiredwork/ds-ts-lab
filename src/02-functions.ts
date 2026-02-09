import { colleagues, friends } from './01-basics'
import { Friend, Colleague } from './myTypes'

function older(f: Friend) : string {
     f.age += 1
     return `${f.name} is now ${f.age}` 
}

function allOlder(friendsArray: Friend[]): string[] {
     return friendsArray.map(friend => {
          friend.age += 1
          return `${friend.name} is now ${friend.age}`
     })
}

console.log(allOlder(friends))
// console.log(older(friends[0]))

// Find the colleague with the highest extension number.
function highestExtension(cs: Colleague[]): Colleague {
  const result = cs.sort(
    (c1, c2) => c1.contact.extension - c2.contact.extension
  );
  return result[cs.length - 1];
}
console.log(highestExtension(colleagues.current));

// Add a colleague, setting their extension to highest extension + 1
function addColleague(
  cs: Colleague[],
  name: string,
  department: string,
  email: string
): void {
  const maxExt = cs.length ? highestExtension(cs).contact.extension : 0;
  const nextExt = maxExt + 1;
  cs.push({
    name,
    department,
    contact: { email, extension: nextExt },
  });
}

addColleague(colleagues.current, "Sheild O Connell", "HR", "soc@here.com");
console.log(colleagues.current.filter((c) => c.name === "Sheild O Connell"));

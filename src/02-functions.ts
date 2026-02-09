import { colleagues, friends } from './01-basics'
import { Friend, Colleague, EmailContact } from './myTypes'

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

function findFriends(friendsArray: Friend[], predicate: (f: Friend) => boolean): string[] {
  return friendsArray.filter(predicate).map(f => f.name)
}

console.log(findFriends(friends, (friend) => friend.name.startsWith('Pa')));
console.log(findFriends(friends, (friend) => friend.age < 35));

console.log(allOlder(friends))
// console.log(older(friends[0]))

// Find the colleague with the highest extension number.
function highestExtension(cs: Colleague[]) { // Inferred retun type
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

function sortColleagues(
  colleagues: Colleague[],
  sorter: (c1: Colleague, c2: Colleague) => number,
  max? : number
): EmailContact[] {
  let end = colleagues.length;
  if (max !== undefined) {
     end = max < 2 ? 1 : max
  }
  const sorted = colleagues.sort(sorter);
  const fullResult =  sorted.map((ce) => ({ name: ce.name, email: ce.contact.email }));
  return fullResult.slice(0,end)
}

function addInterest(friend: Friend, interest: string): string[] {
  if (friend.interests === undefined) {
    friend.interests = [];
  }
  friend.interests.push(interest);
  return friend.interests;
}

console.log(addInterest(friends[0], 'Politics'));
console.log(addInterest(friends[1], 'Cooking'));
console.log(addInterest(friends[1], 'Music'));
console.log(friends.map(f => ({ name: f.name, interests: f.interests?.filter(i => i.startsWith('S'))})));


// Test invocations
console.log(sortColleagues(colleagues.current, (a, b) => (a.contact.extension - b.contact.extension),3));
console.log(sortColleagues(colleagues.current, (a, b) => (a.name.length - b.name.length),1));
console.log(sortColleagues(colleagues.current, (a, b) => (a.name.length - b.name.length))); // NEW

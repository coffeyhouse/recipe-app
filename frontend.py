import os
import re

BASE_PATH = 'client/src'

def list_files_and_dirs(path):
    """List all files and directories in the given path."""
    items = os.listdir(path)
    files = [item for item in items if os.path.isfile(os.path.join(path, item))]
    dirs = [item for item in items if os.path.isdir(os.path.join(path, item))]
    return files, dirs

def display_menu(files, dirs):
    """Display a menu of files and directories."""
    for i, dir_name in enumerate(dirs):
        print(f"{i + 1}. [DIR] {dir_name}")
    for i, file_name in enumerate(files):
        print(f"{i + 1 + len(dirs)}. {file_name}")

def get_choice(files, dirs):
    """Get the user's choice from the menu."""
    while True:
        try:
            choice = int(input("\nEnter the number of your choice: ")) - 1
            if 0 <= choice < len(dirs):
                return 'DIR', dirs[choice]
            elif len(dirs) <= choice < len(files) + len(dirs):
                return 'FILE', files[choice - len(dirs)]
            else:
                print("Invalid choice. Please try again.")
        except ValueError:
            print("Invalid input. Please enter a number.")

def navigate_to_file():
    """Navigate through directories to select a file."""
    current_path = BASE_PATH

    while True:
        print(f"\nCurrent path: {current_path}")
        files, dirs = list_files_and_dirs(current_path)
        display_menu(files, dirs)

        choice_type, choice_name = get_choice(files, dirs)

        if choice_type == 'DIR':
            current_path = os.path.join(current_path, choice_name)
        elif choice_type == 'FILE':
            return os.path.join(current_path, choice_name)

def get_imports(file_path):
    """Extract the import statements from a file and return the paths of the imported files."""
    with open(file_path, 'r') as file:
        content = file.read()

    imports = re.findall(r"import\s.*\sfrom\s*['\"](.*)['\"]", content)
    return imports

def resolve_import_path(import_path, base_path):
    """Resolve the absolute path of an import statement."""
    if import_path.startswith('.'):
        return os.path.normpath(os.path.join(base_path, import_path + '.jsx'))  # Assuming .jsx files, you might need to adjust this
    else:
        # Assuming all non-relative imports are from 'client/src'
        return os.path.normpath(os.path.join(BASE_PATH, import_path + '.jsx'))

def collate_file(file_path, visited, base_path, output):
    """Recursively collate the contents of the file and its imports."""
    if file_path in visited:
        return

    visited.add(file_path)

    with open(file_path, 'r') as file:
        content = file.read()
        output.write(f"\n\n==================== {file_path} ====================\n\n")
        output.write(content)
    
    imports = get_imports(file_path)
    for imp in imports:
        import_path = resolve_import_path(imp, base_path)
        if os.path.exists(import_path):
            collate_file(import_path, visited, os.path.dirname(import_path), output)
        else:
            print(f"Warning: Import {imp} not found at {import_path}")

def main():
    output_file = 'collated_output.txt'
    visited = set()

    start_file_path = navigate_to_file()

    if not os.path.exists(start_file_path):
        print(f"Error: {start_file_path} does not exist.")
        return

    with open(output_file, 'w') as output:
        collate_file(start_file_path, visited, os.path.dirname(start_file_path), output)

    print(f"Collation complete. See {output_file}")

if __name__ == "__main__":
    main()
